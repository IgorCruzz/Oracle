import { ProjectRepository, UserRepository } from '../../database/repositories';

export class DeleteProjectService {
  async execute({ id_project, id_user }) {
    const repository = new ProjectRepository();

    const userRepository = new UserRepository();

    const verifyProjectExists = await repository.findProjectById({
      id_project,
    });

    if (!verifyProjectExists || verifyProjectExists.dt_deleted_at)
      return {
        error: `Não há nenhum Projeto registrado com este ID -> ${id_project}.`,
      };

    const getUserEmail = await userRepository.findUserById({
      id_user,
    });

    await repository.deleteProject({
      id_project,
      nm_deleted_by: getUserEmail.ds_email_login,
    });

    return {
      message: 'Projeto excluído com sucesso!',
    };
  }
}
