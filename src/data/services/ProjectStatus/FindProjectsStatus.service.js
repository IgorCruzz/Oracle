import { ProjectStatusRepository } from '../../database/repositories/ProjectStatus/ProjectStatus.repository';

export class FindProjectsStatusService {
  async execute({ page, limit, ds_status }) {
    const repository = new ProjectStatusRepository();

    const findStatus = await repository.findPhasesStatus({
      limit,
      page,
      ds_status,
    });

    if (findStatus.length === 0)
      return { error: 'Não há nenhum Status registrado.' };

    return {
      status: findStatus,
    };
  }
}
