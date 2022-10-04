"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindLocationsService {
  async execute({ page, limit, id_project }) {
    const repository = new (0, _repositories.LocationRepository)();

    const findLocations = await repository.findLocations({
      limit,
      page,
      id_project,
    });

    if (findLocations.length === 0)
      return { error: 'Não há nenhuma Localização da Obra registrada.' };

    return {
      locations: findLocations,
    };
  }
} exports.FindLocationsService = FindLocationsService;
