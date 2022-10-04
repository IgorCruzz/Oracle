"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindRolesService {
  async execute({ page, limit, nm_role }) {
    const repository = new (0, _repositories.RoleRepository)();

    const findRoles = await repository.findRoles({ page, limit, nm_role });

    if (findRoles.length === 0)
      return { error: 'Não há nenhuma Função registrada.' };

    return {
      roles: findRoles,
    };
  }
} exports.FindRolesService = FindRolesService;
