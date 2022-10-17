import { ProjectStatusRepository } from '../../database/repositories/ProjectStatus/ProjectStatus.repository';

export class FindProjectStatusService {
  async execute({ id_status }) {
    const repository = new ProjectStatusRepository();

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
