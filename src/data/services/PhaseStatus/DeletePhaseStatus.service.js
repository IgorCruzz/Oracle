import { PhaseStatusRepository } from '../../database/repositories/PhaseStatus/PhaseStatus.repository';

export class DeletePhaseStatusService {
  async execute({ id_status }) {
    const repository = new PhaseStatusRepository();

    const verifyPhaseStatusExists = await repository.findPhaseStatusById({
      id_status,
    });

    if (!verifyPhaseStatusExists)
      return { error: `Não existe um Status com este ID -> ${id_status}.` };

    await repository.deletePhaseStatus({
      id_status,
    });

    return {
      message: 'Status excluído com sucesso!',
    };
  }
}
