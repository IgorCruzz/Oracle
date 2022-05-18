import { AllocationPeriodRepository } from '../../database/repositories';

export class CreateAllocationPeriodService {
  async execute(data) {
    const { dt_start_allocation, dt_end_allocation, qt_business_hours } = data;

    const repository = new AllocationPeriodRepository();

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
