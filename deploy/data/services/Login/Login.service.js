"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);



var _repositories = require('../../database/repositories');

 class LoginService {
  async execute(data) {
    const { email, password } = data;

    const repository = new (0, _repositories.UserRepository)();
    const professionalRepository = new (0, _repositories.ProfessionalRepository)();

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
      access_token: _jsonwebtoken2.default.sign(
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
} exports.LoginService = LoginService;
