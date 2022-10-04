"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class UpdatePasswordService {
  async execute(id_user, data) {
    const { oldPassword, newPassword, confirmPassword } = data;

    const repository = new (0, _repositories.UserRepository)();

    if (newPassword !== confirmPassword) {
      return {
        error: 'As senhas não batem, por favor verifique a senha inserida.',
      };
    }

    const verifyEmailExists = await repository.findUserById({
      id_user,
    });

    const { ds_email_login } = verifyEmailExists;

    if (
      !verifyEmailExists ||
      !(await repository.verifyPassword({
        ds_email_login,
        password: oldPassword,
      }))
    ) {
      return { error: 'A sua senha atual está incorreta!' };
    }

    if (oldPassword === newPassword) {
      return { error: 'A senha não pode ser a mesma da atual!' };
    }

    await repository.updateUser(id_user, { password: newPassword });

    return {
      message: 'Senha atualizada com sucesso!',
    };
  }
} exports.UpdatePasswordService = UpdatePasswordService;
