"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class UpdateProgramService {
  async execute({ name, id }) {
    const repository = new (0, _repositories.ProgramRepository)();

    const verifyProgramExists = await repository.findProgramById({
      id,
    });

    if (!verifyProgramExists)
      return {
        error: `Não há nenhum Programa registrado com este ID -> ${id}.`,
      };

    const verifyProgramName = await repository.findProgram({
      name,
    });

    if (verifyProgramName && verifyProgramName.id_program !== Number(id))
      return { error: 'Já existe um Programa registrado com este nome.' };

    const programUpdated = await repository.updateProgram({
      id,
      name,
    });

    return {
      program: programUpdated,
      message: 'Programa atualizado com sucesso!',
    };
  }
} exports.UpdateProgramService = UpdateProgramService;
