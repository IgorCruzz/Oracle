import {
  AllocationRepository,
  ProductHistoryRepository,
} from '../../database/repositories';
import { sequelize } from '../../database';

export class DeleteAllocationService {
  async execute({ allocations }) {
    const t = await sequelize.transaction();

    const repository = new AllocationRepository();

    const productHistoryRepository = new ProductHistoryRepository();

    try {
      await Promise.all(
        allocations.map(
          async ({ id_allocation_period, id_product, id_professional }) => {
            const verifyAllocationExists = await repository.findAllocationToDelete(
              {
                id_allocation_period,
                id_product,
                id_professional,
              }
            );

            // await productHistoryRepository.deleteProductHistoryAllocation({
            //   id_professional,
            //   id_allocation_period,
            //   id_product,
            //   transaction: t,
            // });

            await productHistoryRepository.createProductHistory({
              cd_status: 0,
              dt_status: new Date(Date.now()).toISOString(),
              tx_remark: null,
              id_product,
              id_allocation_period: null,
              id_professional: null,
              id_analyst_user: null,
              transaction: t,
            });

            const { id_allocation } = verifyAllocationExists;
            if (id_allocation) {
              await repository.deleteAllocation({
                id_allocation,
                transaction: t,
              });
            }
          }
        )
      );

      t.commit();

      return {
        message: 'Desalocação efetuada com sucesso!',
      };
    } catch (e) {
      if (t) {
        await t.rollback();
      }

      return { error: 'Ocorreu um problema interno' };
    }
  }
}
