import { PhaseStatusRepository } from '../../database/repositories/PhaseStatus/PhaseStatus.repository';
import { ProjectPhaseRepository } from '../../database/repositories';

export class DeletePhaseStatusService {
  async execute({ id_status }) {
    const repository = new PhaseStatusRepository();
    const projectPhase = new ProjectPhaseRepository();

    const verifyPhaseStatusExists = await repository.findPhaseStatusById({
      id_status,
    });

    if (!verifyPhaseStatusExists)
      return { error: `Não existe um Status com este ID -> ${id_status}.` };

    const verifyFk = await projectPhase.verifyRelationStatus({
      id_status,
    });

    if (verifyFk.length > 0) {
      return {
        error:
          'Não foi possível excluir o Status pois existem Fase de Projetos associados.',
      };
    }

    await repository.deletePhaseStatus({
      id_status,
    });

    return {
      message: 'Status excluído com sucesso!',
    };
  }
}
