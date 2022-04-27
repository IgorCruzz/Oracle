import {
  TechnicalManagerRepository,
  ProjectRepository,
} from '../../database/repositories';

export class CreateProjectPhaseService {
  async execute(data) {
    const { id_project, id_technical_manager } = data;

    const repository = new TechnicalManagerRepository();
    const projectRepository = new ProjectRepository();

    const verifyProjectExists = await projectRepository.findProjectById({
      id_project,
    });

    if (!verifyProjectExists)
      return {
        error: `Não há nenhum Projeto registrado com este ID -> ${id_project}.`,
      };

    const verifyName = await repository.findTechnicalManager({
      id_technical_manager,
    });

    if (verifyName) {
      return {
        error: `Já existe uma Fase de projeto com este nome`,
      };
    }

    const projectPhase = await repository.createTechnicalManager(data);

    if (projectPhase.error) {
      return { error: projectPhase.error };
    }

    return {
      message: 'Fase de projeto registrado com sucesso!',
      projectPhase,
    };
  }
}
