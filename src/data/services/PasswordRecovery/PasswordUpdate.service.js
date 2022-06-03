import { differenceInHours } from 'date-fns';
import {
  UserRepository,
  PasswordRecoveryRepository,
} from '../../database/repositories';

export class PasswordUpdateService {
  async execute(data) {
    const { code, password, confirmPassword, email } = data;

    const repository = new PasswordRecoveryRepository();
    const userRepository = new UserRepository();

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

    const getDifferenceInHours = differenceInHours(
      new Date(),
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

    await repository.updateCode({ cd_recovery: null, email, id_user });

    return {
      message: 'Senha alterada com sucesso!',
    };
  }
}
