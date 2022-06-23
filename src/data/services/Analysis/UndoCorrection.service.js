import { Op } from 'sequelize';

import { ProductHistoryRepository } from '../../database/repositories';
import { sequelize } from '../../database';
import { Product_history } from '../../database/models';

export class UndoCorrectionService {
  async execute(data) {
    const t = await sequelize.transaction();

    const productHistoryRepository = new ProductHistoryRepository();

    try {
      const verifyStatus = data.analysis.filter(value =>
        value.cd_status.match(
          /(Ag. Alocação|Em Produção|Em Análise|Em Análise de Correção|Concluído)/
        )
      );

      if (verifyStatus.length > 0) {
        return {
          error:
            'Só é possível desfazer a solicitação de correção de produtos que estejam em correção.',
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
                      { cd_status: 3 },
                    ],
                  },
                ],
              },
              transaction: t,
            });

            if (getHistory) {
              const { id_professional } = getHistory;

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
        )
      );

      await t.commit();

      return {
        message: 'Solicitação de correção desfeita com sucesso!',
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
