"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _repositories = require('../../database/repositories');

 class CreatePasswordAndLoginService {
  async execute(data) {
    const { email, password } = data;

    const repository = new (0, _repositories.UserRepository)();

    const findUserByEmail = await repository.findUserEmail({
      ds_email_login: email,
    });

    const { id_user, in_temporary_password } = findUserByEmail;

    if (in_temporary_password === 'N') {
      return {
        error: 'Este usuário não possui uma senha provisória.',
      };
    }

    await repository.updateUser(id_user, {
      password,
      in_temporary_password: 'N',
    });

    return {
      message: 'Login realizado com sucesso!',
      access_token: _jsonwebtoken2.default.sign(
        {
          user: {
            id: id_user,
          },
        },
        'f04af61b3f332afa0ceec786a42cd365',
        {
          expiresIn: '72h',
        }
      ),
    };
  }
} exports.CreatePasswordAndLoginService = CreatePasswordAndLoginService;
