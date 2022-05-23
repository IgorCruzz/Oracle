import { AllocationPeriodRepository } from '../../database/repositories';

export class FindAllocationPeriodService {
  async execute({ id_allocation_period }) {
    const repository = new AllocationPeriodRepository();

    const findAllocationPeriod = await repository.findAllocationPeriodById({
      id_allocation_period,
    });

    if (!findAllocationPeriod)
      return {
        error: `Não há nenhum Período de Alocação registrado com este ID -> ${id_allocation_period}.`,
      };

    const {
      dt_start_allocation,
      dt_end_allocation,
      qt_business_hours,
      dt_created_at,
      dt_updated_at,
    } = findAllocationPeriod;

    return {
      allocationPeriod: {
        id_allocation_period,
        dt_start_allocation,
        dt_end_allocation,
        qt_business_hours,
        dt_created_at,
        dt_updated_at,
      },
    };
  }
}
