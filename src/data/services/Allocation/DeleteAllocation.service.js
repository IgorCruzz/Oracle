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
            const verifyAllocationExists = await repository.findAllocation({
              id_allocation_period,
              id_product,
              id_professional,
            });

            await productHistoryRepository.deleteProductHistory({
              id_professional,
              transaction: t,
            });

            const { id_allocation } = verifyAllocationExists;

            await repository.deleteAllocation({
              id_allocation,
              transaction: t,
            });
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
