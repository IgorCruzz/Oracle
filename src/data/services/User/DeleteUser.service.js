import { UserRepository } from '../../database/repositories';

export class DeleteUserService {
  async execute({ id_user }) {
    const repository = new UserRepository();

    const verifyUserIdExists = await repository.findUserById({
      id_user,
    });

    if (verifyUserIdExists) {
      return { error: `Não existe um usuário com este ID -> ${id_user}.` };
    }

    await repository.deleteUser({
      id_user,
    });

    return {
      message: 'Usuário excluído com sucesso!',
    };
  }
}
