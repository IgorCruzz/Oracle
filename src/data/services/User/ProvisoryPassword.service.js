import crypto from 'crypto';
import { UserRepository } from '../../database/repositories';
import NewAccount from '../../jobs/NewAccount';

export class ProvisoryPasswordService {
  async execute({ id_user }) {
    const repository = new UserRepository();

    const provisoryPassword = crypto.randomBytes(5).toString('hex');

    const checkIfUserExists = await repository.findUserById({
      id_user,
    });

    if (!checkIfUserExists) {
      return { error: `Não existe um usuário com este ID -> ${id_user}.` };
    }

    await repository.updateUser(id_user, {
      password: provisoryPassword,
      in_temporary_password: 'S',
    });

    const { ds_email_login } = checkIfUserExists;

    await NewAccount.handle({
      email: ds_email_login,
      password: provisoryPassword,
    });

    return {
      message: 'Senha provisória enviada para o e-mail com sucesso!',
    };
  }
}
