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
    nm_project,
    id_status,
    no_status,
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
      nm_project,
      id_status,
      no_status,
    });

    if (findProjects.length === 0)
      return { error: 'Não há nenhum Projeto registrado.' };

    return {
      projects: findProjects,
    };
  }
}
