"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _datefns = require('date-fns');



var _repositories = require('../../database/repositories');

 class PasswordUpdateService {
  async execute(data) {
    const { code, password, confirmPassword, email } = data;

    const repository = new (0, _repositories.PasswordRecoveryRepository)();
    const userRepository = new (0, _repositories.UserRepository)();

    const user = await userRepository.findUserEmail({ ds_email_login: email });

    if (!user) {
      return {
        error: 'Não existe um usuário com este e-mail.',
      };
    }

    const { id_user } = user;

    const verifyCode = await repository.findUser({ id_user });

    if (!verifyCode || !verifyCode.dataValues.cd_recovery) {
      return {
        error: 'Você não possui código para redefinição de senha.',
      };
    }

    const getDifferenceInHours = _datefns.differenceInHours.call(void 0, 
      new Date().toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
      }),
      new Date(verifyCode.dataValues.dt_updated_at)
    );

    if (
      code !== verifyCode.dataValues.cd_recovery ||
      getDifferenceInHours >= 1
    ) {
      return {
        error: 'Código invalido.',
      };
    }

    if (password !== confirmPassword) {
      return {
        error:
          'A senha no campo de confirmação e no campo senha precisam ser idênticas.',
      };
    }

    await userRepository.updateUser(id_user, { password });

    await repository.deleteCode({ id_user });

    return {
      message: 'Senha alterada com sucesso!',
    };
  }
} exports.PasswordUpdateService = PasswordUpdateService;
