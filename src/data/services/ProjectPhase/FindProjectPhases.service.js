import { ProjectPhaseRepository } from '../../database/repositories';

export class FindProjectPhaseService {
  async execute({ page, limit, id_project }) {
    const repository = new ProjectPhaseRepository();

    const findProjectPhases = await repository.findProjectPhases({
      limit,
      page,
      id_project,
    });

    if (findProjectPhases.length === 0)
      return { error: 'Não há nenhuma Fase de projeto registrada.' };

    return {
      projectPhases: findProjectPhases,
    };
  }
}
