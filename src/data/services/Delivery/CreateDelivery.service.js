import { ProductHistoryRepository } from '../../database/repositories';
import { sequelize } from '../../database';

export class CreateDeliveryService {
  async execute(data) {
    const t = await sequelize.transaction();

    const productHistoryRepository = new ProductHistoryRepository();

    try {
      await Promise.all(
        await data.deliveries.map(
          async ({ id_allocation_period, id_product, tx_remark }) => {
            const getHistory = await productHistoryRepository.findByProductandPeriod(
              {
                id_allocation_period,
                id_product,
                cd_status: 1,
              }
            );

            if (getHistory) {
              const { id_professional } = getHistory;

              const getHistoryWithStatusTwo = await productHistoryRepository.findByProductandPeriod(
                {
                  id_allocation_period,
                  id_product,
                  cd_status: 2,
                }
              );

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