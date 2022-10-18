import { ProjectStatusRepository } from '../../database/repositories/ProjectStatus/ProjectStatus.repository';
import { ProjectRepository } from '../../database/repositories';

export class DeleteProjectStatusService {
  async execute({ id_status }) {
    const repository = new ProjectStatusRepository();
    const projectRepository = new ProjectRepository();

    const verifyStatusExists = await repository.findPhaseStatusById({
      id_status,
    });

    if (!verifyStatusExists)
      return { error: `Não existe um Status com este ID -> ${id_status}.` };

    const verifyFk = await projectRepository.verifyRelationStatus({
      id_status,
    });

    if (verifyFk.length > 0) {
      return {
        error:
          'Não foi possível excluir o Status pois existem Projetos associados.',
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
