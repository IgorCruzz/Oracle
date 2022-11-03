import { Op } from 'sequelize';

import { ProductHistoryRepository } from '../../database/repositories';
import { sequelize } from '../../database';
import { Product_history, Document } from '../../database/models';

export class CreateDeliveryService {
  async execute(data) {
    const { key, originalname } = data;

    const deliveries = JSON.parse(data.deliveries);

    const t = await sequelize.transaction();

    const productHistoryRepository = new ProductHistoryRepository();

    try {
      const verifyStatus = deliveries.filter(value =>
        value.cd_status.match(
          /(Ag. Alocação|Em Análise|Em Análise de Correção|Concluído)/
        )
      );

      if (verifyStatus.length > 0) {
        return {
          error:
            'Só é possível entregar produtos que estejam em produção ou em correção.',
        };
      }

      const kek = await Promise.all(
        deliveries.map(async ({ id_product }) => {
          const checkDocument = await Document.findAll({
            where: {
              id_product,
            },
          });

          return checkDocument.length > 0 ? 'sim' : 'nao';
        })
      );

      const resp = kek.find(item => item === 'nao');

      if (resp === 'nao') {
        return {
          error: 'Não foi possível efetuar a entrega! Há documentos pendentes.',
        };
      }

      const kok = await Promise.all(
        deliveries.map(async ({ id_product }) => {
          const verifyArchives = await Document.findAll({
            where: {
              [Op.and]: [
                {
                  id_product,
                },
                {
                  dt_upload: null,
                },
              ],
            },
          });

          return verifyArchives.length > 0 ? 'nao' : 'sim';
        })
      );

      const resp2 = kok.find(item => item === 'nao');

      if (resp2 === 'nao') {
        return {
          error: 'Não foi possível efetuar a entrega! Há documentos pendentes.',
        };
      }

      await Promise.all(
        await deliveries.map(
          async ({ id_allocation_period, id_product, tx_remark }) => {
            const findLastRecord = await Product_history.findAll({
              attributes: [
                [
                  sequelize.fn('MAX', sequelize.col('id_product_history')),
                  'id_product_history',
                ],
              ],
              group: sequelize.col('id_product'),
              raw: true,
            });

            const values = findLastRecord.map(
              ({ id_product_history }) => id_product_history
            );

            const getHistory2 = await Product_history.findOne({
              where: {
                [Op.and]: [
                  {
                    id_product_history: {
                      [Op.in]: values,
                    },
                  },
                  { id_product },
                  { id_allocation_period },
                  { cd_status: 3 },
                ],
              },
              transaction: t,
            });

            if (getHistory2) {
              const { id_professional } = getHistory2;

              const getHistoryWithStatusTwo = await Product_history.findOne({
                where: {
                  [Op.and]: [
                    {
                      id_product_history: {
                        [Op.in]: values,
                      },
                    },
                    { id_product },
                    { id_allocation_period },
                    { cd_status: 4 },
                  ],
                },
                transaction: t,
              });

              if (!getHistoryWithStatusTwo) {
                await productHistoryRepository.createProductHistory({
                  cd_status: 4,
                  dt_status: new Date(Date.now()).toISOString(),
                  tx_remark,
                  id_product,
                  id_allocation_period,
                  id_professional,
                  id_analyst_user: null,
                  transaction: t,
                  nm_original_file: originalname || null,
                  nm_file: key || null,
                });
              }
            }

            const getHistory = await Product_history.findOne({
              where: {
                [Op.and]: [
                  {
                    id_product_history: {
                      [Op.in]: values,
                    },
                  },
                  { id_product },
                  { id_allocation_period },
                  { cd_status: 1 },
                ],
              },
              transaction: t,
            });

            if (getHistory) {
              const { id_professional } = getHistory;

              const getHistoryWithStatusTwo = await Product_history.findOne({
                where: {
                  [Op.and]: [
                    {
                      id_product_history: {
                        [Op.in]: values,
                      },
                    },
                    { id_product },
                    { id_allocation_period },
                    { cd_status: 2 },
                  ],
                },
                transaction: t,
              });

              if (!getHistoryWithStatusTwo) {
                await productHistoryRepository.createProductHistory({
                  cd_status: 2,
                  dt_status: new Date(Date.now()).toISOString(),
                  tx_remark,
                  id_product,
                  id_allocation_period,
                  id_professional,
                  id_analyst_user: null,
                  transaction: t,
                  nm_original_file: originalname || null,
                  nm_file: key || null,
                });
              }
            }
          }
        )
      );

      await t.commit();

      return {
        message: 'Entrega registrada com sucesso!',
      };
    } catch (e) {
      console.log(e);
      if (t) {
        await t.rollback();
      }

      return { error: 'Ocorreu um problema interno' };
    }
  }
}
