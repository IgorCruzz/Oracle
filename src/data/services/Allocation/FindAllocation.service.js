import { AllocationPeriodRepository } from '../../database/repositories';

export class FindAllocationService {
  async execute({ id_allocation_period }) {
    const repository = new AllocationPeriodRepository();

    const findAllocationPeriod = await repository.findAllocationPeriodById({
      id_allocation_period,
    });

    if (!findAllocationPeriod)
      return {
        error: `Não há nenhum Período de Alocação registrado com este ID -> ${id_allocation_period}.`,
      };

    return {
      allocationPeriod: findAllocationPeriod,
    };
  }
}
