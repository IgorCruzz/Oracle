"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindCitiesService {
  async execute({ page, limit, regionId, nm_city }) {
    const repository = new (0, _repositories.CityRepository)();

    const findCities = await repository.findCites({
      limit,
      page,
      regionId,
      nm_city,
    });

    if (findCities.length === 0)
      return { error: 'Não há Municípios registrados.' };

    return {
      cities: findCities,
    };
  }
} exports.FindCitiesService = FindCitiesService;
