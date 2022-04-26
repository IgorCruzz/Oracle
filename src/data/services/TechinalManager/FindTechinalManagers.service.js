import { TechnicalManagerRepository } from '../../database/repositories';

export class FindTechinalManagersService {
  async execute({ page, limit, id_project }) {
    const repository = new TechnicalManagerRepository();

    const findTechnicalManagers = await repository.findTechnicalManagers({
      limit,
      page,
      id_project,
    });

    if (findTechnicalManagers.length === 0)
      return { error: 'Não há nenhum Polígono de Área registrado.' };

    return {
      technicalManagers: findTechnicalManagers,
    };
  }
}
