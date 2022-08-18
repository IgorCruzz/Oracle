import jwt from 'jsonwebtoken';
import {
  UserRepository,
  ProfessionalRepository,
} from '../../database/repositories';

export class LoginService {
  async execute(data) {
    const { email, password } = data;

    const repository = new UserRepository();
    const professionalRepository = new ProfessionalRepository();

    const verifyEmailExists = await repository.findUserEmail({
      ds_email_login: email,
    });

    const verifyIfUserIsActive = await repository.isActive({
      ds_email_login: email,
    });

    if (
      !verifyEmailExists ||
      !(await repository.verifyPassword({
        ds_email_login: email,
        password,
      })) ||
      !verifyIfUserIsActive
    ) {
      return { error: 'O e-mail ou a senha não corresponde a uma conta.' };
    }

    const { in_temporary_password } = verifyEmailExists;

    if (in_temporary_password === 'S') {
      return {
        error: 'Redefina a senha para prosseguir com o login.',
      };
    }

    if (verifyEmailExists.tp_profile === 2) {
      const verifyAssociation = await professionalRepository.findUser({
        id_user: verifyEmailExists.id_user,
      });

      if (!verifyAssociation) {
        return {
          error:
            'Este login deve estar associado a um colaborador. Por favor, contacte o administrador do sistema.',
        };
      }
    }

    return {
      message: 'Login realizado com sucesso!',
      access_token: jwt.sign(
        {
          user: {
            id: verifyEmailExists.id_user,
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
