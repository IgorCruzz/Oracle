import { ProjectRepository } from '../../database/repositories';

export class FindProjectsService {
  async execute({
    page,
    limit,
    id_city,
    id_category,
    id_program,
    id_agency,
    search,
  }) {
    const repository = new ProjectRepository();

    const findProjects = await repository.findProjects({
      page,
      limit,
      id_city,
      id_category,
      id_program,
      id_agency,
      search,
    });

    if (findProjects.length === 0)
      return { error: 'Não há nenhum projeto registrado.' };

    return {
      projects: findProjects,
    };
  }
}
