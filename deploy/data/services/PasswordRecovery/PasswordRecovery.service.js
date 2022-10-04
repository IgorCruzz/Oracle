"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _crypto = require('crypto'); var _crypto2 = _interopRequireDefault(_crypto);



var _repositories = require('../../database/repositories');
var _RecoverPassword = require('../../jobs/RecoverPassword'); var _RecoverPassword2 = _interopRequireDefault(_RecoverPassword);

 class PasswordRecoveryService {
  async execute(data) {
    const { email } = data;

    const repository = new (0, _repositories.PasswordRecoveryRepository)();
    const userRepository = new (0, _repositories.UserRepository)();

    const verifyEmailExists = await userRepository.findUserEmail({
      ds_email_login: email,
    });

    if (!verifyEmailExists) {
      return { error: 'E-mail não corresponde a uma conta.' };
    }

    const { id_user } = verifyEmailExists;

    const cd_recovery = _crypto2.default.randomBytes(3).toString('hex');

    const findUser = await repository.findUser({
      id_user,
    });

    if (findUser) {
      await repository.updateCode({
        id_user,
        email,
        cd_recovery,
      });

      await _RecoverPassword2.default.handle({
        token: cd_recovery,
        email,
      });

      return {
        message: `Link de redefinição de senha enviado para o seu e-mail.`,
      };
    }

    await repository.createRecoveryPassword({
      id_user,
      email,
      cd_recovery,
    });

    await _RecoverPassword2.default.handle({
      token: cd_recovery,
      email,
    });

    return {
      message: `Link de redefinição de senha enviado para o seu e-mail.`,
    };
  }
} exports.PasswordRecoveryService = PasswordRecoveryService;
