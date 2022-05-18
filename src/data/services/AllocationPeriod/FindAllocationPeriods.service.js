import { AllocationPeriodRepository } from '../../database/repositories';

export class FindAllocationPeriodsService {
  async execute({
    page,
    limit,
    dt_start_allocation,
    dt_end_allocation,
    qt_business_hours,
  }) {
    const repository = new AllocationPeriodRepository();

    const findAllocationPeriods = await repository.findAllocationPeriods({
      limit,
      page,
      dt_start_allocation,
      dt_end_allocation,
      qt_business_hours,
    });

    return {
      allocationPeriods: findAllocationPeriods,
    };
  }
}
