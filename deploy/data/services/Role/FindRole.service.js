"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindRoleService {
  async execute({ id_role }) {
    const repository = new (0, _repositories.RoleRepository)();

    const findRole = await repository.findRoleById({
      id_role,
    });

    if (!findRole)
      return { error: `Não existe uma Função com este ID -> ${id_role}.` };

    return {
      role: findRole,
    };
  }
} exports.FindRoleService = FindRoleService;
