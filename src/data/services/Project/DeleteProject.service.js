import { ProjectRepository } from '../../database/repositories';

export class DeleteProjectService {
  async execute({ id_project }) {
    const repository = new ProjectRepository();

    const verifyAgencyExists = await repository.findProjectById({
      id_project,
    });

    if (!verifyAgencyExists)
      return {
        error: `Não há nenhum projeto registrado com este ID -> ${id_project}.`,
      };

    await repository.deleteProject({
      id_project,
    });

    return {
      message: 'Projeto excluído com sucesso!',
    };
  }
}
