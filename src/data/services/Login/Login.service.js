import jwt from 'jsonwebtoken';
import { UserRepository } from '../../database/repositories';

export class LoginService {
  async execute(data) {
    const { email, password } = data;

    const repository = new UserRepository();

    const verifyEmailExists = await repository.findUserEmail({
      ds_email_login: email,
    });

    if (
      !verifyEmailExists ||
      !(await repository.verifyPassword({
        ds_email_login: email,
        password,
      }))
    ) {
      return { error: 'O e-mail ou a senha não corresponde a uma conta.' };
    }

    return {
      message: 'Login realizado com sucesso!',
      access_token: jwt.sign(
        { id: verifyEmailExists.id },
        'f04af61b3f332afa0ceec786a42cd365',
        {
          expiresIn: '24h',
        }
      ),
    };
  }
}
