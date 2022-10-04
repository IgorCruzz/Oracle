"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindJurisdictionService {
  async execute({ id }) {
    const repository = new (0, _repositories.JurisdictionRepository)();

    const findJurisdiction = await repository.findJurisdictionById({
      id,
    });

    if (!findJurisdiction)
      return {
        error: `Não existe uma Esfera registrada com este ID -> ${id}.`,
      };

    return {
      jurisdiction: findJurisdiction,
    };
  }
} exports.FindJurisdictionService = FindJurisdictionService;
