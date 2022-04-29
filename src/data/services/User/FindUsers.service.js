import { UserRepository } from '../../database/repositories';

export class FindUsersService {
  async execute({ page, limit }) {
    const repository = new UserRepository();

    const findUsers = await repository.findUsers({ page, limit });

    if (findUsers.length === 0)
      return { error: 'Não há nenhum usuário registrado.' };

    return {
      users: findUsers,
    };
  }
}
