"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindRegionService {
  async execute({ id }) {
    const repository = new (0, _repositories.RegionRepository)();

    const findRegion = await repository.findRegionById({
      id,
    });

    if (!findRegion)
      return {
        error: `Não existe uma Região registrada com este ID -> ${id}.`,
      };

    return {
      region: findRegion,
    };
  }
} exports.FindRegionService = FindRegionService;
