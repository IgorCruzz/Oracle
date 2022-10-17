import { ProjectStatusRepository } from '../../database/repositories/ProjectStatus/ProjectStatus.repository';

export class UpdateProjectStatusService {
  async execute(id_status, data) {
    const { ds_status } = data;

    const repository = new ProjectStatusRepository();

    const verifyStatusExists = await repository.findPhaseStatusById({
      id_status,
    });

    if (!verifyStatusExists)
      return { error: `Não existe um Status com este ID -> ${id_status}.` };

    const verifyDsStatus = await repository.findPhaseStatus({
      ds_status,
    });

    if (verifyDsStatus && verifyDsStatus.id_status !== Number(id_status))
      return { error: 'Já existe um Status registrado com este nome.' };

    const statusUpdated = await repository.updatePhaseStatus(id_status, data);

    return {
      message: 'Status atualizado com sucesso!',
      status: statusUpdated,
    };
  }
}
