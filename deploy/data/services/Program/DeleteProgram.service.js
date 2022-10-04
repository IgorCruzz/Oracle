"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _repositories = require('../../database/repositories');

 class DeleteProgramService {
  async execute({ id }) {
    const repository = new (0, _repositories.ProgramRepository)();
    const projectRepository = new (0, _repositories.ProjectRepository)();

    const verifyProgramExists = await repository.findProgramById({
      id,
    });

    if (!verifyProgramExists)
      return {
        error: `Não há nenhum Programa registrado com este ID -> ${id}.`,
      };

    const verifyFk = await projectRepository.verifyRelationProgram({
      id_program: id,
    });

    if (verifyFk.length > 0) {
      return {
        error:
          'Não foi possível excluir o Programa pois existem Projetos associados.',
      };
    }

    await repository.deleteProgram({
      id,
    });

    return {
      message: 'Programa excluído com sucesso!',
    };
  }
} exports.DeleteProgramService = DeleteProgramService;
