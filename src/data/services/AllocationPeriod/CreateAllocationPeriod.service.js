import { AllocationPeriodRepository } from '../../database/repositories';
// import { verifyDate } from '../../../utils/verifyDate';

export class CreateAllocationPeriodService {
  async execute(data) {
    const { dt_start_allocation, dt_end_allocation, qt_business_hours } = data;

    const repository = new AllocationPeriodRepository();

    // dtPlannedStart = verifyDate({
    //   msg: 'Data de ínicio planejado inválida. Utilize o formato dd/mm/yyyy',
    //   value: dt_planned_start,
    // });

    // if (dtPlannedStart.error) {
    //   return { error: dtPlannedStart.error };
    // }

    const verifyAllocationPeriodExists = await repository.findAllocationPeriod({
      dt_start_allocation,
      dt_end_allocation,
      qt_business_hours,
    });

    if (verifyAllocationPeriodExists) {
      return {
        error: 'Já existe um Período de Alocação com estes dados.',
      };
    }

    const allocationPeriod = await repository.createAllocationPeriod(data);

    return {
      message: 'Período de Alocação registrado com sucesso!',
      allocationPeriod,
    };
  }
}
