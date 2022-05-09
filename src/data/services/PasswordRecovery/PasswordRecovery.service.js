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

    const token = crypto.randomBytes(3).toString('hex');

    await repository.createRecoveryPassword({
      email,
      token,
    });

    await RecoverPassword.handle({ create: 'teste' });

    return {
      message: `Token enviado para o e-mail ${email} `,
    };
  }
}
