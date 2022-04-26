import {
  TechnicalManagerRepository,
  ProjectRepository,
} from '../../database/repositories';

export class CreateTechinalManagerService {
  async execute(data) {
    const { id_project } = data;

    const repository = new TechnicalManagerRepository();
    const projectRepository = new ProjectRepository();

    const verifyProjectExists = await projectRepository.findLocationById({
      id_project,
    });

    if (!verifyProjectExists)
      return {
        error: `Não há nenhum Projeto de Canteiro registrada com este ID -> ${id_project}.`,
      };

    const technicalManager = await repository.createTechnicalManager(data);

    return {
      message: 'Técnico responsável registrado com sucesso!',
      technicalManager,
    };
  }
}
