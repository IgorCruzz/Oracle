import { UserRepository } from '../../database/repositories';

export class UpdateUserService {
  async execute(id_user, data) {
    const { nm_role } = data;

    const repository = new UserRepository();

    const verifyUserExists = await repository.findUserById({
      id_user,
    });

    if (!verifyUserExists)
      return { error: `Não existe um usuário com este ID -> ${id_user}.` };

    const verifyUserEmail = await repository.findRole({
      nm_role,
    });

    if (verifyUserEmail && verifyUserEmail.id_user !== Number(id_user))
      return { error: 'Já existe um usuário com este e-mail.' };

    const userUpdated = await repository.updateUser(id_user, data);

    return {
      message: 'Usuário atualizado com sucesso!',
      user: userUpdated,
    };
  }
}
