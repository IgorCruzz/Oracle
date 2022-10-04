"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindRoleGradesService {
  async execute({ id_grade, id_role, limit, page, vl_hour_cost, vl_salary }) {
    const repository = new (0, _repositories.RoleGradeRepository)();

    const findRoles = await repository.findRoleGrades({
      id_grade,
      id_role,
      limit,
      page,
      vl_hour_cost,
      vl_salary,
    });

    if (findRoles.length === 0)
      return { error: 'Não há nenhum Custo HH registrado.' };

    return {
      coustsHH: findRoles,
    };
  }
} exports.FindRoleGradesService = FindRoleGradesService;
