"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindGradiesService {
  async execute({ page, limit, nm_grade }) {
    const repository = new (0, _repositories.GradeRepository)();

    const findGradies = await repository.findGradies({
      limit,
      page,
      nm_grade,
    });

    if (findGradies.length === 0)
      return { error: 'Não há nenhum Cargo registrado.' };

    return {
      gradies: findGradies,
    };
  }
} exports.FindGradiesService = FindGradiesService;
