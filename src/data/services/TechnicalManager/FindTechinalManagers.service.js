import { TechnicalManagerRepository } from '../../database/repositories';

export class FindTechnicalManagersService {
  async execute({ page, limit, id_project, name, crea, responsability }) {
    const repository = new TechnicalManagerRepository();

    const findTechnicalManagers = await repository.findTechnicalManagers({
      limit,
      page,
      id_project,
      name,
      crea,
      responsability,
    });

    if (findTechnicalManagers.length === 0)
      return { error: 'Não há nenhum Polígono de Área registrado.' };

    return {
      technicalManagers: findTechnicalManagers,
    };
  }
}
