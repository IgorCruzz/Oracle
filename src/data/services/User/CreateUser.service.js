import crypto from 'crypto';
import {
  UserRepository,
  ProfessionalRepository,
} from '../../database/repositories';
import NewAccount from '../../jobs/NewAccount';

export class CreateUserService {
  async execute(data) {
    const { ds_email_login, id_professional, provisory_password } = data;
    const provisoryPassword = crypto.randomBytes(5).toString('hex');

    const repository = new UserRepository();
    const professionalRepository = new ProfessionalRepository();

    const verifyEmailExists = await repository.findUserEmail({
      ds_email_login,
    });

    if (verifyEmailExists) {
      return { error: 'Já existe um usuário com este e-mail.' };
    }

    if (id_professional) {
      const verifyIfProfessionalHasAssociation = await professionalRepository.findProfessionalById(
        {
          id_professional,
        }
      );

      if (verifyIfProfessionalHasAssociation.id_user) {
        return {
          error: 'O colaborador escolhido já possui associação a uma conta.',
        };
      }
    }

    const user = await repository.createUser({
      ...data,
      password: provisoryPassword,
    });

    if (id_professional) {
      const { id_user } = user.dataValues;

      await professionalRepository.updateProfessional(id_professional, {
        id_user,
      });
    }

    const { id_user } = user.dataValues;

    const getUserCreated = await repository.findUserById({
      id_user,
    });

    if (provisory_password) {
      await NewAccount.handle({
        email: ds_email_login,
        password: provisoryPassword,
      });
    }

    return {
      message: 'Usuário registrado com sucesso!',
      user: getUserCreated,
    };
  }
}
