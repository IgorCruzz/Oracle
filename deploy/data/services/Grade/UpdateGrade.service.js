"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class UpdateGradeService {
  async execute(id_grade, data) {
    const { nm_grade } = data;

    const repository = new (0, _repositories.GradeRepository)();

    const verifyGradeExists = await repository.findGradeById({
      id_grade,
    });

    if (!verifyGradeExists)
      return { error: `Não existe um Cargo com este ID -> ${id_grade}.` };

    const verifyGradeName = await repository.findGrade({
      nm_grade,
    });

    if (verifyGradeName && verifyGradeName.id_grade !== Number(id_grade))
      return { error: 'Já existe um Cargo registrado com este nome.' };

    const gradeUpdated = await repository.updateGrade(id_grade, data);

    return {
      message: 'Cargo atualizado com sucesso!',
      grade: gradeUpdated,
    };
  }
} exports.UpdateGradeService = UpdateGradeService;
