import { TechnicalManagerRepository } from '../../database/repositories';

export class FindTechnicalManagersService {
  async execute({
    page,
    limit,
    id_project,
    nm_project,
    nu_crea,
    tp_responsability,
  }) {
    const repository = new TechnicalManagerRepository();

    const findTechnicalManagers = await repository.findTechnicalManagers({
      page,
      limit,
      id_project,
      nm_project,
      nu_crea,
      tp_responsability,
    });

    if (findTechnicalManagers.length === 0)
      return { error: 'Não há nenhum Técnico responsável registrado.' };

    return {
      technicalManagers: findTechnicalManagers,
    };
  }
}
