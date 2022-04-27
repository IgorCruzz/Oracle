import { ProjectPhaseRepository } from '../../database/repositories';

export class FindProjectPhaseService {
  async execute({ id_project_phase }) {
    const repository = new ProjectPhaseRepository();

    const findProjectPhase = await repository.findProjectPhaseById({
      id_project_phase,
      populate: true,
    });

    if (!findProjectPhase)
      return {
        error: `Não há nenhuma Fase de projeto registrada com este ID -> ${id_project_phase}.`,
      };

    return {
      projectPhase: findProjectPhase,
    };
  }
}
