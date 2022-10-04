"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class CreateCityService {
  async execute({ name, regionId }) {
    const repository = new (0, _repositories.CityRepository)();
    const regionRepository = new (0, _repositories.RegionRepository)();

    const verifyRegionExists = await regionRepository.findRegionById({
      id: regionId,
    });

    if (!verifyRegionExists)
      return {
        error: `Não existe uma Região registrada com este ID -> ${regionId}.`,
      };

    const verifyCityExists = await repository.findCity({
      name,
    });

    if (verifyCityExists)
      return { error: 'Já foi registrado um Município com este nome.' };

    const city = await repository.createCity({ name, regionId });

    return {
      message: 'Município registrado com sucesso!',
      city,
    };
  }
} exports.CreateCityService = CreateCityService;
