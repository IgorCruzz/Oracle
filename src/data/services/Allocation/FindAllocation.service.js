import { AllocationRepository } from '../../database/repositories';

export class FindAllocationService {
  async execute({ id_allocation }) {
    const repository = new AllocationRepository();

    const findAllocation = await repository.findAllocationById({
      id_allocation,
    });

    if (!findAllocation)
      return {
        error: `Não há nenhuma Alocação registrada com este ID -> ${id_allocation}.`,
      };

    return {
      allocation: findAllocation,
    };
  }
}
