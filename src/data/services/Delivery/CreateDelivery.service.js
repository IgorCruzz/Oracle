import { Op } from 'sequelize';

import { ProductHistoryRepository } from '../../database/repositories';
import { sequelize } from '../../database';
import { Product_history } from '../../database/models';

export class CreateDeliveryService {
  async execute(data) {
    const t = await sequelize.transaction();

    const productHistoryRepository = new ProductHistoryRepository();

    try {
      await Promise.all(
        await data.deliveries.map(
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
      if (t) {
        await t.rollback();
      }

      return { error: 'Ocorreu um problema interno' };
    }
  }
}
