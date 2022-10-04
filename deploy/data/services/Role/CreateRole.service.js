"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class CreateRoleService {
  async execute(data) {
    const { nm_role } = data;

    const repository = new (0, _repositories.RoleRepository)();

    const verifyRoleExists = await repository.findRole({
      nm_role,
    });

    if (verifyRoleExists)
      return { error: 'Já existe uma Função registrada com este nome.' };

    const role = await repository.createRole(data);

    return {
      message: 'Função registrada com sucesso!',
      role: role.dataValues,
    };
  }
} exports.CreateRoleService = CreateRoleService;
