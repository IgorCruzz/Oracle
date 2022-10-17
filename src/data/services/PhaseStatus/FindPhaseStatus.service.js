import { PhaseStatusRepository } from '../../database/repositories/PhaseStatus/PhaseStatus.repository';

export class FindPhaseStatusService {
  async execute({ id_status }) {
    const repository = new PhaseStatusRepository();

    const findStatus = await repository.findPhaseStatusById({
      id_status,
    });

    if (!findStatus)
      return { error: `Não existe um Status com este ID -> ${id_status}.` };

    return {
      status: findStatus,
    };
  }
}
