import {
  TechnicalManagerRepository,
  ProjectRepository,
} from '../../database/repositories';

export class CreateTechnicalManagerService {
  async execute(data) {
    const { id_project, nu_crea } = data;

    const repository = new TechnicalManagerRepository();
    const projectRepository = new ProjectRepository();

    const verifyProjectExists = await projectRepository.findProjectById({
      id_project,
    });

    if (!verifyProjectExists)
      return {
        error: `Não há nenhum Projeto registrado com este ID -> ${id_project}.`,
      };

    const verifyCrea = await repository.verifyCREA({
      nu_crea,
    });

    if (verifyCrea) {
      return {
        error: `Já existe um Técnico responsável com o CREA ${nu_crea}`,
      };
    }

    const technicalManager = await repository.createTechnicalManager(data);

    return {
      message: 'Técnico responsável registrado com sucesso!',
      technicalManager,
    };
  }
}
