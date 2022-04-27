import { ProjectPhaseRepository } from '../../database/repositories';

export class DeleteProjectPhaseService {
  async execute({ id_project_phase }) {
    const repository = new ProjectPhaseRepository();

    const verifyProjectPhaseExists = await repository.findProjectPhaseById({
      id_project_phase,
    });

    if (!verifyProjectPhaseExists)
      return {
        error: `Não há nenhuma Fase de projeto registrado com este ID -> ${id_project_phase}.`,
      };

    await repository.deleteProjectPhase({
      id_project_phase,
    });

    return {
      message: 'Fase de projeto excluída com sucesso!',
    };
  }
}
