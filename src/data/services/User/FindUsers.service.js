import { UserRepository } from '../../database/repositories';

export class FindUsersService {
  async execute() {
    const repository = new UserRepository();

    const findUsers = await repository.findUsers();

    if (findUsers.length === 0)
      return { error: 'Não há nenhum usuário registrado.' };

    return {
      users: findUsers,
    };
  }
}
