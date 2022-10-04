"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class UpdateRoleService {
  async execute(id_role, data) {
    const { nm_role } = data;

    const repository = new (0, _repositories.RoleRepository)();

    const verifyRoleExists = await repository.findRoleById({
      id_role,
    });

    if (!verifyRoleExists)
      return { error: `Não existe uma Função com este ID -> ${id_role}.` };

    const verifyRoleName = await repository.findRole({
      nm_role,
    });

    if (verifyRoleName && verifyRoleName.id_role !== Number(id_role))
      return { error: 'Já existe uma Função registrada com este nome.' };

    const roleUpdated = await repository.updateRole(id_role, data);

    return {
      message: 'Função atualizada com sucesso!',
      role: roleUpdated,
    };
  }
} exports.UpdateRoleService = UpdateRoleService;
