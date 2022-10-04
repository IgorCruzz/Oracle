"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindJurisdictionsService {
  async execute({ page, limit, nm_jurisdiction }) {
    const repository = new (0, _repositories.JurisdictionRepository)();

    const findJurisdictions = await repository.findJurisdictions({
      limit,
      page,
      nm_jurisdiction,
    });

    if (findJurisdictions.length === 0)
      return { error: 'Não há Esfera registrada.' };

    return {
      jurisdictions: findJurisdictions,
    };
  }
} exports.FindJurisdictionsService = FindJurisdictionsService;
