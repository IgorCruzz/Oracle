"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class CreateProgramService {
  async execute({ name }) {
    const repository = new (0, _repositories.ProgramRepository)();

    const verifyProgramExists = await repository.findProgram({
      name,
    });

    if (verifyProgramExists)
      return { error: 'Já existe um Programa registrado com este nome.' };

    const program = await repository.createProgram({ name });

    return {
      message: 'Programa registrado com sucesso!',
      program,
    };
  }
} exports.CreateProgramService = CreateProgramService;
