"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _repositories = require('../../database/repositories');

 class CreateAgencyService {
  async execute({ name, jurisdictionId }) {
    const repository = new (0, _repositories.AgencyRepository)();
    const jurisdictionRepository = new (0, _repositories.JurisdictionRepository)();

    const verifyJurisdictionExists = await jurisdictionRepository.findJurisdictionById(
      {
        id: jurisdictionId,
      }
    );

    if (!verifyJurisdictionExists)
      return {
        error: `Não há nenhuma Esfera registrada com este ID -> ${jurisdictionId}.`,
      };

    const verifyAgencyExists = await repository.findAgency({
      name,
    });

    if (verifyAgencyExists)
      return { error: 'Já existe um Orgão registrado com este nome.' };

    const agency = await repository.createAgency({ name, jurisdictionId });

    return {
      message: 'Orgão registrado com sucesso!',
      agency,
    };
  }
} exports.CreateAgencyService = CreateAgencyService;
