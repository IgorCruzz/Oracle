import { AllocationPeriodRepository } from '../../database/repositories';

export class FindAllocationPeriodsService {
  async execute({
    page,
    limit,
    dt_start_allocation_in,
    dt_start_allocation_at,
    dt_end_allocation_in,
    dt_end_allocation_at,
    qt_business_hours,
  }) {
    const repository = new AllocationPeriodRepository();

    const findAllocationPeriods = await repository.findAllocationPeriods({
      limit,
      page,
      dt_start_allocation_in,
      dt_start_allocation_at,
      dt_end_allocation_in,
      dt_end_allocation_at,
      qt_business_hours,
    });

    return {
      allocationPeriods: findAllocationPeriods,
    };
  }
}
