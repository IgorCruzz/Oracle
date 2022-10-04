"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindLocationService {
  async execute({ id_location }) {
    const repository = new (0, _repositories.LocationRepository)();

    const findLocation = await repository.findLocationById({
      id_location,
      populate: true,
    });

    if (!findLocation)
      return {
        error: `Não há nenhuma Localização da Obra registrada com este ID -> ${id_location}.`,
      };

    return {
      location: findLocation,
    };
  }
} exports.FindLocationService = FindLocationService;
