import { AllocationPeriodRepository } from '../../database/repositories';

export class DeleteAllocationPeriodService {
  async execute({ id_allocation_period }) {
    const repository = new AllocationPeriodRepository();

    const verifyAllocationPeriodExists = await repository.findAllocationPeriodById(
      {
        id_allocation_period,
      }
    );

    if (!verifyAllocationPeriodExists)
      return {
        error: `Não há nenhum Período de Alocação registrado com este ID -> ${id_allocation_period}.`,
      };

    await repository.deleteAllocationPeriod({
      id_allocation_period,
    });

    return {
      message: 'Período de Alocação excluído com sucesso!',
    };
  }
}
