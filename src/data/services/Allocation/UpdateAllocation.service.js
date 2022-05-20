import { AllocationRepository } from '../../database/repositories';

export class UpdateAllocationService {
  async execute(id_allocation, data) {
    const repository = new AllocationRepository();

    const AllocationUpdated = await repository.updateAllocationPeriod(
      id_allocation,
      data
    );

    return {
      message: 'Alocação atualizada com sucesso!',
      allocation: AllocationUpdated,
    };
  }
}
