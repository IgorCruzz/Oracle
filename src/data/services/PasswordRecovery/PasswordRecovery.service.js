import crypto from 'crypto';
import {
  UserRepository,
  PasswordRecoveryRepository,
} from '../../database/repositories';
import RecoverPassword from '../../jobs/RecoverPassword';

export class PasswordRecoveryService {
  async execute(data) {
    const { email } = data;

    const repository = new PasswordRecoveryRepository();
    const userRepository = new UserRepository();

    const verifyEmailExists = await userRepository.findUserEmail({
      ds_email_login: email,
    });

    if (!verifyEmailExists) {
      return { error: 'E-mail não corresponde a uma conta.' };
    }

    const { id_user } = verifyEmailExists;

    const cd_recovery = crypto.randomBytes(3).toString('hex');

    const findUser = await repository.findUser({
      id_user,
    });

    if (findUser) {
      await repository.updateCode({
        id_user,
        email,
        cd_recovery,
      });

      await RecoverPassword.handle({
        token: cd_recovery,
        email,
      });

      const [mail, rest] = email.split('@');

      const hideMail = `${mail}@`.padEnd(mail.length + rest.length, '*');

      return {
        message: `Token enviado para o e-mail: ${hideMail} `,
      };
    }

    await repository.createRecoveryPassword({
      id_user,
      email,
      cd_recovery,
    });

    await RecoverPassword.handle({
      token: cd_recovery,
      email,
    });

    const [mail, rest] = email.split('@');

    const hideMail = `${mail}@`.padEnd(mail.length + rest.length, '*');

    return {
      message: `Token enviado para o e-mail: ${hideMail} `,
    };
  }
}
