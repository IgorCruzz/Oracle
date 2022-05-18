import { AllocationPeriodRepository } from '../../database/repositories';

export class UpdateAllocationPeriodService {
  async execute(id_allocation_period, data) {
    const repository = new AllocationPeriodRepository();

    const verifyAllocationPeriodId = await repository.findLocationById({
      id_allocation_period,
    });

    if (!verifyAllocationPeriodId) {
      return {
        error: `Não há nenhum Período de Alocação registrado com este ID -> ${id_allocation_period}.`,
      };
    }

    const AllocationPeriodUpdated = await repository.updateAllocationPeriod(
      id_allocation_period,
      data
    );

    return {
      message: 'Período de Alocação atualizado com sucesso!',
      allocationPeriod: AllocationPeriodUpdated,
    };
  }
}
