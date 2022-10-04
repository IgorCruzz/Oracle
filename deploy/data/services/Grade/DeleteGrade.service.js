"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _repositories = require('../../database/repositories');

 class DeleteGradeService {
  async execute({ id_grade }) {
    const repository = new (0, _repositories.GradeRepository)();
    const roleGradeRepository = new (0, _repositories.RoleGradeRepository)();

    const verifyGradeExists = await repository.findGradeById({
      id_grade,
    });

    if (!verifyGradeExists)
      return { error: `Não existe um Cargo com este ID -> ${id_grade}.` };

    const verifyFk = await roleGradeRepository.verifyRelationGrade({
      id_grade,
    });

    if (verifyFk.length > 0) {
      return {
        error:
          'Não foi possível excluir o Cargo pois existem Custos HH associados.',
      };
    }

    await repository.deleteGrade({
      id_grade,
    });

    return {
      message: 'Cargo excluído com sucesso!',
    };
  }
} exports.DeleteGradeService = DeleteGradeService;
