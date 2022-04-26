import {
  TechnicalManagerRepository,
  ProjectRepository,
} from '../../database/repositories';

export class UpdateTechnicalManagerService {
  async execute(id_technical_manager, data) {
    const { id_project } = data;

    const repository = new TechnicalManagerRepository();
    const projectRepository = new ProjectRepository();

    const verifyTechnicalManagerExists = await repository.findTechnicalManagerById(
      {
        id_technical_manager,
      }
    );

    if (!verifyTechnicalManagerExists)
      return {
        error: `Não há nenhum Técnico responsável registrado com este ID -> ${id_technical_manager}.`,
      };

    if (id_project) {
      const projectExists = await projectRepository.findProjectById({
        id_project,
      });

      if (!projectExists) {
        return {
          error: `Não há nenhum Projeto registrado com este ID -> ${id_project}.`,
        };
      }
    }

    const technicalManagerUpdated = await repository.updateTechnicalManagerArea(
      id_technical_manager,
      data
    );

    return {
      message: 'Técnico responsável atualizado com sucesso!',
      technicalManager: technicalManagerUpdated,
    };
  }
}
