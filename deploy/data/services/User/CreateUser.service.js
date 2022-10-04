"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _crypto = require('crypto'); var _crypto2 = _interopRequireDefault(_crypto);



var _repositories = require('../../database/repositories');
var _NewAccount = require('../../jobs/NewAccount'); var _NewAccount2 = _interopRequireDefault(_NewAccount);

 class CreateUserService {
  async execute(data) {
    const { ds_email_login, id_professional, provisory_password } = data;
    const provisoryPassword = _crypto2.default.randomBytes(5).toString('hex');

    const repository = new (0, _repositories.UserRepository)();
    const professionalRepository = new (0, _repositories.ProfessionalRepository)();

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
      await _NewAccount2.default.handle({
        email: ds_email_login,
        password: provisoryPassword,
      });
    }

    return {
      message: 'Usuário registrado com sucesso!',
      user: getUserCreated,
    };
  }
} exports.CreateUserService = CreateUserService;
