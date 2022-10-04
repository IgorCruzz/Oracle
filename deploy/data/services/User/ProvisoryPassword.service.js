"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _crypto = require('crypto'); var _crypto2 = _interopRequireDefault(_crypto);
var _repositories = require('../../database/repositories');
var _NewAccount = require('../../jobs/NewAccount'); var _NewAccount2 = _interopRequireDefault(_NewAccount);

 class ProvisoryPasswordService {
  async execute({ id_user }) {
    const repository = new (0, _repositories.UserRepository)();

    const provisoryPassword = _crypto2.default.randomBytes(5).toString('hex');

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

    await _NewAccount2.default.handle({
      email: ds_email_login,
      password: provisoryPassword,
    });

    return {
      message: 'Senha provisória enviada para o e-mail com sucesso!',
    };
  }
} exports.ProvisoryPasswordService = ProvisoryPasswordService;
