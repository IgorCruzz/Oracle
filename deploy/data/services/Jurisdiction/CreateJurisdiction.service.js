"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class CreateJurisdictionService {
  async execute({ name }) {
    const repository = new (0, _repositories.JurisdictionRepository)();

    const verifyJurisdictionExists = await repository.findJurisdiction({
      name,
    });

    if (verifyJurisdictionExists)
      return { error: 'Já existe uma Esfera com este nome registrado.' };

    const jurisdiction = await repository.createJurisdiction({ name });

    return {
      message: 'Esfera registrada com sucesso!',
      jurisdiction,
    };
  }
} exports.CreateJurisdictionService = CreateJurisdictionService;
