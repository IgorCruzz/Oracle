import { AllocationRepository } from '../../database/repositories';

export class FindProfessionalPtiService {
  async execute({
    page,
    limit,
    cd_priority,
    id_project,
    id_project_phase,
    nm_product,
    tp_profile,
    id_professional,
    allocation_period,
  }) {
    const repository = new AllocationRepository();

    const findAllocations = await repository.findAllocations({
      page,
      limit,
      cd_priority,
      id_project,
      id_project_phase,
      nm_product,
      tp_profile,
      id_professional,
      allocation_period,
    });

    return {
      allocations: findAllocations,
    };
  }
}
