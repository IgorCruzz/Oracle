"use strict";Object.defineProperty(exports, "__esModule", {value: true});



var _repositories = require('../../database/repositories');

 class CreateRoleGradeService {
  async execute(data) {
    const { id_grade, id_role } = data;

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

    const verifyRoleExists = await repository.findRoleGrade({
      id_grade,
      id_role,
    });

    if (verifyRoleExists)
      return {
        error: 'Custo HH já cadastrado!',
      };

    const coustHH = await repository.createRoleGrade(data);

    return {
      message: 'Custo HH registrado com sucesso!',
      coustHH: coustHH.dataValues,
    };
  }
} exports.CreateRoleGradeService = CreateRoleGradeService;
