import jwt from 'jsonwebtoken';
import { UserRepository } from '../../database/repositories';

export class LoginService {
  async execute(data) {
    const { email, password } = data;

    const repository = new UserRepository();

    const verifyEmailExists = await repository.findUserEmail({
      ds_email_login: email,
    });

    const verifyIfUserIsActive = await repository.isActive({
      ds_email_login: email,
    });

    if (
      !verifyEmailExists ||
      !(await repository.verifyPassword({
        ds_email_login: email,
        password,
      })) ||
      !verifyIfUserIsActive
    ) {
      return { error: 'O e-mail ou a senha não corresponde a uma conta.' };
    }

    const { in_temporary_password } = verifyEmailExists;

    if (in_temporary_password === 'S') {
      return {
        error: 'Redefina a senha para prosseguir com o login.',
      };
    }

    return {
      message: 'Login realizado com sucesso!',
      access_token: jwt.sign(
        {
          user: {
            id: verifyEmailExists.id_user,
          },
        },
        'f04af61b3f332afa0ceec786a42cd365',
        {
          expiresIn: '72h',
        }
      ),
    };
  }
}
