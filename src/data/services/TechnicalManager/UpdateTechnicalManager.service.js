import {
  TechnicalManagerRepository,
  ProjectRepository,
} from '../../database/repositories';

export class UpdateTechnicalManagerService {
  async execute(id_technical_manager, data) {
    const { id_project, nu_crea } = data;

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
    if (nu_crea) {
      const verifyCrea = await repository.verifyCREA({
        nu_crea,
      });

      if (
        verifyCrea &&
        verifyCrea.id_technical_manager !== Number(id_technical_manager)
      ) {
        return {
          error: `Já existe um Técnico responsável com o CREA ${nu_crea}`,
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
