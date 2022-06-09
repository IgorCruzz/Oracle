import { UserRepository } from '../../database/repositories';

export class UpdatePasswordService {
  async execute(id_user, data) {
    const { oldPassword, newPassword, confirmPassword } = data;

    const repository = new UserRepository();

    if (newPassword !== confirmPassword) {
      return {
        error: 'As senhas não batem, por favor verifique a senha inserida.',
      };
    }

    const verifyEmailExists = await repository.findUserById({
      id_user,
    });

    const { ds_email_login } = verifyEmailExists;

    if (
      !verifyEmailExists ||
      !(await repository.verifyPassword({
        ds_email_login,
        password: oldPassword,
      }))
    ) {
      return { error: 'A sua senha atual está incorreta!' };
    }

    if (oldPassword === newPassword) {
      return { error: 'A senha não pode ser a mesma da atual!' };
    }

    await repository.updateUser(id_user, data);

    return {
      message: 'Senha atualizada com sucesso!',
    };
  }
}
