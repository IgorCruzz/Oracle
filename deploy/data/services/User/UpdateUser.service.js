"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _repositories = require('../../database/repositories');

 class UpdateUserService {
  async execute(id_user, data) {
    const { ds_email_login, id_professional, removeProfessional } = data;

    const repository = new (0, _repositories.UserRepository)();
    const professionalRepository = new (0, _repositories.ProfessionalRepository)();

    const verifyUserExists = await repository.findUserById({
      id_user,
    });

    if (!verifyUserExists)
      return { error: `Não existe um usuário com este ID -> ${id_user}.` };

    const verifyUserEmail = await repository.findUserEmail({
      ds_email_login,
    });

    if (verifyUserEmail && verifyUserEmail.id_user !== Number(id_user))
      return { error: 'Já existe um usuário com este e-mail.' };

    if (id_professional) {
      const verifyIfProfessionalHasAssociation = await professionalRepository.findProfessionalById(
        {
          id_professional,
        }
      );

      if (
        verifyIfProfessionalHasAssociation.id_user &&
        verifyIfProfessionalHasAssociation.id_user !== Number(id_user)
      ) {
        return {
          error: 'O colaborador escolhido já possui associação a uma conta.',
        };
      }
    }

    const userUpdated = await repository.updateUser(id_user, data);

    if (removeProfessional) {
      await professionalRepository.updateProfessional(removeProfessional, {
        id_user: null,
      });
    }

    if (id_professional) {
      const { id_user: idUser } = userUpdated.dataValues;

      const checkIfUserHasProfessionalAssociated = await professionalRepository.findUser(
        {
          id_user,
        }
      );

      if (!checkIfUserHasProfessionalAssociated) {
        await professionalRepository.updateProfessional(id_professional, {
          id_user: idUser,
        });
      }

      await professionalRepository.updateProfessional(
        checkIfUserHasProfessionalAssociated.id_professional,
        {
          id_user: null,
        }
      );

      await professionalRepository.updateProfessional(id_professional, {
        id_user: idUser,
      });
    }

    return {
      message: 'Usuário atualizado com sucesso!',
      user: userUpdated,
    };
  }
} exports.UpdateUserService = UpdateUserService;
