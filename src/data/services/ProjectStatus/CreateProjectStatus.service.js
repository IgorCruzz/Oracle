import { ProjectStatusRepository } from '../../database/repositories/ProjectStatus/ProjectStatus.repository';

export class CreateProjectStatusService {
  async execute({ ds_status }) {
    const repository = new ProjectStatusRepository();

    const verifyStatusExists = await repository.findPhaseStatus({
      ds_status,
    });

    if (verifyStatusExists)
      return { error: 'Já existe um Status registrado com este nome.' };

    const status = await repository.createPhaseStatus({ ds_status });

    return {
      message: 'Status registrado com sucesso!',
      status: status.dataValues,
    };
  }
}
