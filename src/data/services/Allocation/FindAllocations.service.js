import { AllocationRepository } from '../../database/repositories';

export class FindAllocationsService {
  async execute({
    page,
    limit,
    tp_action_picture,
    qt_hours_picture,
    vl_salary_picture,
    vl_hour_cost_foto,
    id_allocation_period,
    id_product,
    id_professional,
    id_role_picture,
    id_grade_picture,
    id_sector_picture,
  }) {
    const repository = new AllocationRepository();

    const findAllocations = await repository.findAllocations({
      page,
      limit,
      tp_action_picture,
      qt_hours_picture,
      vl_salary_picture,
      vl_hour_cost_foto,
      id_allocation_period,
      id_product,
      id_professional,
      id_role_picture,
      id_grade_picture,
      id_sector_picture,
    });

    return {
      allocations: findAllocations,
    };
  }
}
