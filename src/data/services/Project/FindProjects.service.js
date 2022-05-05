import { ProjectRepository } from '../../database/repositories';

export class FindProjectsService {
  async execute({
    page,
    limit,
    id_city,
    id_category,
    id_program,
    id_agency,
    cd_sei,
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
      cd_sei,
      search,
    });

    if (findProjects.length === 0)
      return { error: 'Não há nenhum Projeto registrado.' };

    return {
      projects: findProjects,
    };
  }
}
