"use strict";Object.defineProperty(exports, "__esModule", {value: true});



var _repositories = require('../../database/repositories');

 class UpdateRoleGradeService {
  async execute(id_role_grade, data) {
    const { id_role, id_grade } = data;
    const repository = new (0, _repositories.RoleGradeRepository)();

    const gradeRepository = new (0, _repositories.GradeRepository)();
    const roleRepository = new (0, _repositories.RoleRepository)();

    const verifyRole = await roleRepository.findRoleById({
      id_role,
    });

    if (!verifyRole) {
      return {
        error: `Não há nenhuma função registrada com este ID -> ${id_role}.`,
      };
    }

    const verifyGradeExists = await gradeRepository.findGradeById({
      id_grade,
    });

    if (!verifyGradeExists) {
      return {
        error: `Não há nenhum Cargo registrado com este ID -> ${id_grade}.`,
      };
    }

    const verifyRoleExists = await repository.findRoleGradeById({
      id_role_grade,
    });

    if (!verifyRoleExists)
      return {
        error: `Não existe um Custo HH com este ID -> ${id_role_grade}.`,
      };

    const verifyRoleIsUnique = await repository.findRoleGrade({
      id_grade,
      id_role,
    });

    if (
      verifyRoleIsUnique &&
      verifyRoleIsUnique.id_role_grade !== Number(id_role_grade)
    )
      return {
        error: 'Custo HH já cadastrado!',
      };

    const roleUpdated = await repository.updateRoleGrade(id_role_grade, data);

    return {
      message: 'Custo HH atualizado com sucesso!',
      coustHH: roleUpdated,
    };
  }
} exports.UpdateRoleGradeService = UpdateRoleGradeService;
