import jwt from 'jsonwebtoken';
import { UserRepository } from '../../database/repositories';

export class CreatePasswordAndLoginService {
  async execute(data) {
    const { email, password } = data;

    const repository = new UserRepository();

    const findUserByEmail = await repository.findUserEmail({
      ds_email_login: email,
    });

    const { id_user, in_temporary_password } = findUserByEmail;

    if (in_temporary_password === 'N') {
      return {
        error: 'Este usuário não possui uma senha provisória.',
      };
    }

    await repository.updateUser(id_user, {
      password,
      in_temporary_password: 'N',
    });

    return {
      message: 'Login realizado com sucesso!',
      access_token: jwt.sign(
        {
          user: {
            id: id_user,
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
