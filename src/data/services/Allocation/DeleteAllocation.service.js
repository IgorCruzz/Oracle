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

            await productHistoryRepository.deleteProductHistoryAllocation({
              id_professional,
              id_allocation_period,
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
      console.log(e);
      if (t) {
        await t.rollback();
      }

      return { error: 'Ocorreu um problema interno' };
    }
  }
}
