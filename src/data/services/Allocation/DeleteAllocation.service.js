import { AllocationRepository } from '../../database/repositories';

export class DeleteAllocationService {
  async execute({ id_allocation }) {
    const repository = new AllocationRepository();

    const verifyAllocationPeriodExists = await repository.findAllocationPeriodById(
      {
        id_allocation,
      }
    );

    if (!verifyAllocationPeriodExists)
      return {
        error: `Não há nenhuma Alocação registrada com este ID -> ${id_allocation}.`,
      };

    await repository.deleteAllocationPeriod({
      id_allocation,
    });

    return {
      message: 'Alocação excluída com sucesso!',
    };
  }
}
