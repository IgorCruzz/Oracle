import { TimelapseRepository } from '../../database/repositories';

export class FindTimelapsesService {
  async execute({
    page,
    limit,
    id_project_phase,
  }) {
    const repository = new TimelapseRepository();

    const findTimelapses = await repository.findTimelapses({
      page,
      limit,
      id_project_phase,
    });

    if (findTimelapses.length === 0)
      return { error: 'Não há nenhum timelapse registrado.' };

    return {
      timelapses: findTimelapses,
    };
  }
}
