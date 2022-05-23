import { AllocationRepository } from '../../database/repositories';

export class FindAllocationsService {
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
    ag_alocation,
    on_production,
    in_correction,
    in_analisys,
    in_analisysCorretion,
    concluded,
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
      ag_alocation,
      on_production,
      in_correction,
      in_analisys,
      in_analisysCorretion,
      concluded,
    });

    return {
      allocations: findAllocations,
    };
  }
}
