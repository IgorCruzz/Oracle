"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _repositories = require('../../database/repositories');

 class DeleteJurisdictionService {
  async execute({ id }) {
    const repository = new (0, _repositories.JurisdictionRepository)();
    const agencyRepository = new (0, _repositories.AgencyRepository)();

    const verifyJurisdictionExists = await repository.findJurisdictionById({
      id,
    });

    if (!verifyJurisdictionExists)
      return {
        error: `Não há nenhuma Esfera registrada com este ID -> ${id}.`,
      };

    const verifyFk = await agencyRepository.verifyJurisdiction({
      jurisdictionId: id,
    });

    if (verifyFk.length > 0) {
      return {
        error:
          'Não foi possível excluir a Esfera pois existem Órgãos associados.',
      };
    }

    await repository.deleteJurisdiction({
      id,
    });

    return {
      message: 'Esfera excluída com sucesso!',
    };
  }
} exports.DeleteJurisdictionService = DeleteJurisdictionService;
