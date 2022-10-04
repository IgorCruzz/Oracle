"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindUserService {
  async execute({ id_user }) {
    const repository = new (0, _repositories.UserRepository)();

    const findUser = await repository.findUserById({
      id_user,
    });

    if (!findUser)
      return { error: `Não existe um usuário com este ID -> ${id_user}.` };

    return {
      user: findUser,
    };
  }
} exports.FindUserService = FindUserService;
