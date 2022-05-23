import { compareDesc } from 'date-fns';
import { AllocationPeriodRepository } from '../../database/repositories';
import { verifyDate } from '../../../utils/verifyDate';

export class UpdateAllocationPeriodService {
  async execute(id_allocation_period, data) {
    const { dt_start_allocation, dt_end_allocation } = data;

    const repository = new AllocationPeriodRepository();

    const dtAllocationStart = verifyDate({
      msg:
        'Data inicial do período de Alocação inválida. Utilize o formato dd/mm/yyyy',
      value: dt_start_allocation,
    });

    if (dtAllocationStart.error) {
      return { error: dtAllocationStart.error };
    }

    const dtAllocationEnd = verifyDate({
      msg: 'Data final do período de Alocação. Utilize o formato dd/mm/yyyy',
      value: dt_end_allocation,
    });

    if (dtAllocationEnd.error) {
      return { error: dtAllocationEnd.error };
    }

    const compareDate = compareDesc(
      new Date(dtAllocationStart),
      new Date(dtAllocationEnd)
    );

    if (compareDate === -1) {
      return {
        error:
          'A data final do período de Alocação precisa ser posterior a de Ínicio',
      };
    }

    const verifyAllocationPeriodId = await repository.findAllocationPeriodById({
      id_allocation_period,
    });

    if (!verifyAllocationPeriodId) {
      return {
        error: `Não há nenhum Período de Alocação registrado com este ID -> ${id_allocation_period}.`,
      };
    }

    const AllocationPeriodUpdated = await repository.updateAllocationPeriod(
      id_allocation_period,
      data
    );

    return {
      message: 'Período de Alocação atualizado com sucesso!',
      allocationPeriod: AllocationPeriodUpdated,
    };
  }
}
