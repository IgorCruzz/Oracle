"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindGradeService {
  async execute({ id_grade }) {
    const repository = new (0, _repositories.GradeRepository)();

    const findGrade = await repository.findGradeById({
      id_grade,
    });

    if (!findGrade)
      return { error: `Não existe um Cargo com este ID -> ${id_grade}.` };

    return {
      grade: findGrade,
    };
  }
} exports.FindGradeService = FindGradeService;
