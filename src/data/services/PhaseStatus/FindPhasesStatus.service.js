import { PhaseStatusRepository } from '../../database/repositories/PhaseStatus/PhaseStatus.repository';

export class FindPhasesStatusService {
  async execute({ page, limit, ds_status }) {
    const repository = new PhaseStatusRepository();

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
