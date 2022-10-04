"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _repositories = require('../../database/repositories');

 class DeleteUserService {
  async execute({ id_user }) {
    const repository = new (0, _repositories.UserRepository)();
    const professionalRepository = new (0, _repositories.ProfessionalRepository)();

    const verifyUserIdExists = await repository.findUserById({
      id_user,
    });

    if (!verifyUserIdExists) {
      return { error: `Não existe um usuário com este ID -> ${id_user}.` };
    }

    const verifyFkFromProfessional = await professionalRepository.verifyRelationUser(
      {
        id_user,
      }
    );

    if (verifyFkFromProfessional.length > 0) {
      return {
        error:
          'Não foi possível excluir o usuário pois existe Colaboradores associados.',
      };
    }

    await repository.deleteUser({
      id_user,
    });

    return {
      message: 'Usuário excluído com sucesso!',
    };
  }
} exports.DeleteUserService = DeleteUserService;
