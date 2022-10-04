"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindRoleGradeService {
  async execute({ id_role_grade }) {
    const repository = new (0, _repositories.RoleGradeRepository)();

    const findRole = await repository.findRoleGradeById({
      id_role_grade,
      populate: true,
    });

    if (!findRole)
      return {
        error: `Não existe um Custo HH com este ID -> ${id_role_grade}.`,
      };

    return {
      coustHH: findRole,
    };
  }
} exports.FindRoleGradeService = FindRoleGradeService;
