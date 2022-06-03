import {
  AllocationPeriodRepository,
  AllocationRepository,
  ProductHistoryRepository,
} from '../../database/repositories';

export class DeleteAllocationPeriodService {
  async execute({ id_allocation_period }) {
    const repository = new AllocationPeriodRepository();
    const allocationRepository = new AllocationRepository();
    const productHistoryRepository = new ProductHistoryRepository();

    const verifyAllocationPeriodExists = await repository.findAllocationPeriodById(
      {
        id_allocation_period,
      }
    );

    if (!verifyAllocationPeriodExists)
      return {
        error: `Não há nenhum Período de Alocação registrado com este ID -> ${id_allocation_period}.`,
      };

    const verifyFkAllocation = await allocationRepository.verifyRelationAllocationPeriod(
      {
        id_allocation_period,
      }
    );

    if (verifyFkAllocation.length > 0) {
      return {
        error:
          'Não foi possível excluir o Período de Alocação pois existem Alocações associadas.',
      };
    }

    const verifyFkProductHistory = await productHistoryRepository.verifyRelationAllocationPeriod(
      {
        id_allocation_period,
      }
    );

    if (verifyFkProductHistory.length > 0) {
      return {
        error:
          'Não foi possível excluir o Período de Alocação pois existem Históricos de produtos associados.',
      };
    }

    await repository.deleteAllocationPeriod({
      id_allocation_period,
    });

    return {
      message: 'Período de Alocação excluído com sucesso!',
    };
  }
}
