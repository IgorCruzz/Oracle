"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');






var _models = require('../../database/models');

 class DeleteProjectService {
  async execute({ id_project, id_user }) {
    const repository = new (0, _repositories.ProjectRepository)();
    const userRepository = new (0, _repositories.UserRepository)();

    const verifyProjectExists = await repository.findProjectById({
      id_project,
    });

    if (!verifyProjectExists || verifyProjectExists.dt_deleted_at)
      return {
        error: `Não há nenhum Projeto registrado com este ID -> ${id_project}.`,
      };

    const verifyProduct = await _models.Allocation.findAll({
      include: [
        {
          model: _models.Product,
          required: true,
          as: 'product',
          include: [
            {
              model: _models.Product_history,
              required: true,
              as: 'product_history',
            },
            {
              model: _models.Project_phase,
              required: true,
              as: 'project_phase',
              include: [
                {
                  model: _models.Project,
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
        error:
          'Não foi possível excluir o projeto pois há alocações associadas!',
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
} exports.DeleteProjectService = DeleteProjectService;
