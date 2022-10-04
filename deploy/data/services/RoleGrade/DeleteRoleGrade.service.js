"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _repositories = require('../../database/repositories');

 class DeleteRoleGradeService {
  async execute({ id_role_grade }) {
    const repository = new (0, _repositories.RoleGradeRepository)();
    const professionalRepository = new (0, _repositories.ProfessionalRepository)();

    const verifyRoleExists = await repository.findRoleGradeById({
      id_role_grade,
    });

    if (!verifyRoleExists)
      return {
        error: `Não existe um Custo HH com este ID -> ${id_role_grade}.`,
      };

    const verifyFkFromProfessional = await professionalRepository.verifyRelationRoleGrade(
      {
        id_role_grade,
      }
    );

    if (verifyFkFromProfessional.length > 0) {
      return {
        error:
          'Não foi possível excluir o Custo HH pois existem Colaboradores associados.',
      };
    }

    await repository.deleteRoleGrade({
      id_role_grade,
    });

    return {
      message: 'Custo HH excluído com sucesso!',
    };
  }
} exports.DeleteRoleGradeService = DeleteRoleGradeService;
