"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindAgenciesService {
  async execute({ page, limit, jurisdictionId, nm_agency }) {
    const repository = new (0, _repositories.AgencyRepository)();

    const findAgencies = await repository.findAgencies({
      limit,
      page,
      jurisdictionId,
      nm_agency,
    });

    if (findAgencies.length === 0)
      return { error: 'Não há nenhum Orgão registrado.' };

    return {
      agencies: findAgencies,
    };
  }
} exports.FindAgenciesService = FindAgenciesService;
