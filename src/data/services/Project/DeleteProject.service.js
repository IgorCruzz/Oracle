import { ProjectRepository, UserRepository } from '../../database/repositories';
import {
  Allocation,
  Product,
  Product_history,
  Project_phase,
  Project,
} from '../../database/models';

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

    const verifyProduct = await Allocation.findAll({
      include: [
        {
          model: Product,
          required: true,
          as: 'product',
          include: [
            {
              model: Product_history,
              required: true,
              as: 'product_history',
            },
            {
              model: Project_phase,
              required: true,
              as: 'project_phase',
              include: [
                {
                  model: Project,
                  required: true,
                  as: 'project',
                  where: {
                    id_project,
                  },
                },
              ],
            },
          ],
        },
      ],
    });

    if (verifyProduct.length >= 1) {
      return {
        message:
          'Não foi possível excluir o projeto pois há alocações referente!',
      };
    }

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
