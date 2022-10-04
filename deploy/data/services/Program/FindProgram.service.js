"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindProgramService {
  async execute({ id }) {
    const repository = new (0, _repositories.ProgramRepository)();

    const findProgram = await repository.findProgramById({
      id,
    });

    if (!findProgram)
      return {
        error: `Não há nenhum Programa registrado com este ID -> ${id}.`,
      };

    return {
      program: findProgram,
    };
  }
} exports.FindProgramService = FindProgramService;
