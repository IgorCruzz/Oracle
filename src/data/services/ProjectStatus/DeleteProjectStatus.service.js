import { ProjectStatusRepository } from '../../database/repositories/ProjectStatus/ProjectStatus.repository';

export class DeleteProjectStatusService {
  async execute({ id_status }) {
    const repository = new ProjectStatusRepository();

    const verifyStatusExists = await repository.findPhaseStatusById({
      id_status,
    });

    if (!verifyStatusExists)
      return { error: `Não existe um Status com este ID -> ${id_status}.` };

    await repository.deletePhaseStatus({
      id_status,
    });

    return {
      message: 'Status excluído com sucesso!',
    };
  }
}
