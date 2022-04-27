import { ProjectRepository } from '../../database/repositories';

export class FindProjectService {
  async execute({ id_project }) {
    const repository = new ProjectRepository();

    const findProject = await repository.findProjectById({
      id_project,
      populate: true,
    });

    if (!findProject)
      return {
        error: `Não há nenhum Projeto registrado com este ID -> ${id_project}.`,
      };

    return {
      project: findProject,
    };
  }
}
