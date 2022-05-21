import { AllocationRepository } from '../../database/repositories';

export class FindPeriodPtiService {
  async execute({ page, limit, allocation_period, id_role, nm_professional }) {
    const repository = new AllocationRepository();

    const findAllocations = await repository.findAllocations({
      page,
      limit,
      allocation_period,
      id_role,
      nm_professional,
    });

    return {
      ptis: findAllocations,
    };
  }
}
