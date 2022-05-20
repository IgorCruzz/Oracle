import {
  AllocationRepository,
  ProductHistoryRepository,
} from '../../database/repositories';
import { sequelize } from '../../database';

export class DeleteAllocationService {
  async execute({ id_allocation }) {
    const t = await sequelize.transaction();

    const repository = new AllocationRepository();

    const productHistoryRepository = new ProductHistoryRepository();

    try {
      const getAllocation = await repository.findAllocationById({
        id_allocation,
        transaction: t,
      });

      if (!getAllocation)
        return {
          error: `Não há nenhuma locação registrada com este ID -> ${id_allocation}.`,
        };

      const { id_product } = getAllocation;

      await productHistoryRepository.updateProductHistory({
        cd_status: 0,
        dt_status: new Date(Date.now()).toISOString(),
        tx_remark: null,
        id_product,
        id_allocation_period: null,
        id_professional: null,
        id_analyst_user: null,
        transaction: t,
      });

      await repository.deleteAllocation({
        id_allocation,
        transaction: t,
      });

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
