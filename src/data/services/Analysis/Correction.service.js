import { Op } from 'sequelize';

import { ProductHistoryRepository } from '../../database/repositories';
import { sequelize } from '../../database';
import { Product_history } from '../../database/models';

export class CorrectionService {
  async execute(data, userId) {
    const t = await sequelize.transaction();

    const productHistoryRepository = new ProductHistoryRepository();

    try {
      const verifyStatus = data.analysis.filter(value =>
        value.cd_status.match(
          /(Ag. Alocação|Em Produção|Em Correção|Concluído)/
        )
      );

      if (verifyStatus.length > 0) {
        return {
          error:
            'Só é possível solicitar a correção de produtos que estejam em análise ou em análise de correção.',
        };
      }

      await Promise.all(
        await data.analysis.map(
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

            const getHistory = await Product_history.findOne({
              where: {
                [Op.or]: [
                  {
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
                  {
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
                ],
              },
              transaction: t,
            });

            if (getHistory) {
              const { id_professional } = getHistory;

              await productHistoryRepository.createProductHistory({
                cd_status: 3,
                dt_status: new Date(Date.now()).toISOString(),
                tx_remark,
                id_product,
                id_allocation_period,
                id_professional,
                id_analyst_user: userId,
                transaction: t,
              });
            }
          }
        )
      );

      await t.commit();

      return {
        message: 'Correção solicitada com sucesso!',
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
