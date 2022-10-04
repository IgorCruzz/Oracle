"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class CreateRegionService {
  async execute({ name }) {
    const repository = new (0, _repositories.RegionRepository)();

    const verifyRegionExists = await repository.findRegion({
      name,
    });

    if (verifyRegionExists)
      return { error: 'Já existe uma Região registrada com este nome.' };

    const region = await repository.createRegion({ name });

    return {
      message: 'Região registrada com sucesso!',
      region,
    };
  }
} exports.CreateRegionService = CreateRegionService;
