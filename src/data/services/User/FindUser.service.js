import { UserRepository } from '../../database/repositories';

export class FindUserService {
  async execute({ id_user }) {
    const repository = new UserRepository();

    const findUser = await repository.findUserById({
      id_user,
    });

    if (!findUser)
      return { error: `Não existe um usuário com este ID -> ${id_user}.` };

    return {
      user: findUser,
    };
  }
}
