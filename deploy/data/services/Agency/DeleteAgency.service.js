"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _repositories = require('../../database/repositories');

 class DeleteAgencyService {
  async execute({ id }) {
    const repository = new (0, _repositories.AgencyRepository)();
    const projectRepository = new (0, _repositories.ProjectRepository)();

    const verifyAgencyExists = await repository.findAgencyById({
      id,
    });

    if (!verifyAgencyExists)
      return {
        error: `Não há nenhum Orgão registrado com este ID -> ${id}.`,
      };

    const verifyFk = await projectRepository.verifyRelationAgency({
      id_agency: id,
    });

    if (verifyFk.length > 0) {
      return {
        error:
          'Não foi possível excluir o Orgão pois existem Projetos associados.',
      };
    }

    await repository.deleteAgency({
      id,
    });

    return {
      message: 'Orgão excluído com sucesso!',
    };
  }
} exports.DeleteAgencyService = DeleteAgencyService;
