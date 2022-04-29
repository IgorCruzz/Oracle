import { UserRepository } from '../../database/repositories';

export class CreateUserService {
  async execute(data) {
    const { ds_email_login } = data;

    const repository = new UserRepository();

    const verifyEmailExists = await repository.findUserEmail({
      ds_email_login,
    });

    if (verifyEmailExists) {
      return { error: 'Já existe um usuário com este e-mail.' };
    }

    const user = await repository.createUser(data);

    return {
      message: 'Usuário registrado com sucesso!',
      user: user.dataValues,
    };
  }
}
