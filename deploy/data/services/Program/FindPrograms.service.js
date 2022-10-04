"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindProgramsService {
  async execute({ page, limit, nm_program }) {
    const repository = new (0, _repositories.ProgramRepository)();

    const findPrograms = await repository.findPrograms({
      limit,
      page,
      nm_program,
    });

    if (findPrograms.length === 0)
      return { error: 'Não há nenhum Programa registrado' };

    return {
      programs: findPrograms,
    };
  }
} exports.FindProgramsService = FindProgramsService;
