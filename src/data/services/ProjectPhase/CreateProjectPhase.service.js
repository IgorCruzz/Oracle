import {
  ProjectPhaseRepository,
  ProjectRepository,
} from '../../database/repositories';

export class CreateProjectPhaseService {
  async execute(data) {
    const { id_project, nm_project_phase } = data;

    const repository = new ProjectPhaseRepository();
    const projectRepository = new ProjectRepository();

    const verifyProjectExists = await projectRepository.findProjectById({
      id_project,
    });

    if (!verifyProjectExists)
      return {
        error: `Não há nenhum Projeto registrado com este ID -> ${id_project}.`,
      };

    const verifyName = await repository.findProjectPhase({
      nm_project_phase,
    });

    if (verifyName) {
      return {
        error: `Já existe uma Fase de projeto com este nome`,
      };
    }

    const projectPhase = await repository.createProjectPhase(data);

    if (projectPhase.error) {
      return { error: projectPhase.error };
    }

    return {
      message: 'Fase de projeto registrado com sucesso!',
      projectPhase,
    };
  }
}
