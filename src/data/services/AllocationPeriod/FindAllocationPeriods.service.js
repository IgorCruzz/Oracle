import { compareDesc } from 'date-fns';
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

    if (dt_start_allocation_at && !dt_start_allocation_in) {
      return {
        error: 'Por favor preencha o campo Data inicio de',
      };
    }

    if (!dt_start_allocation_at && dt_start_allocation_in) {
      return {
        error: 'Por favor preencha o campo Data inicio até',
      };
    }

    if (dt_end_allocation_at && !dt_end_allocation_in) {
      return {
        error: 'Por favor preencha o campo Data final de',
      };
    }

    if (!dt_end_allocation_at && dt_end_allocation_in) {
      return {
        error: 'Por favor preencha o campo Data final até',
      };
    }

    const compareDateIn = compareDesc(
      new Date(dt_start_allocation_in),
      new Date(dt_start_allocation_at)
    );

    if (compareDateIn === -1) {
      return {
        error:
          'O campo "Data inicio até" precisa ser posterior ao campo "Data inicio de"',
      };
    }

    const compareDateAt = compareDesc(
      new Date(dt_start_allocation_in),
      new Date(dt_start_allocation_at)
    );

    if (compareDateAt === -1) {
      return {
        error:
          'O campo "Data final até" precisa ser posterior ao campo "Data final de"',
      };
    }

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
