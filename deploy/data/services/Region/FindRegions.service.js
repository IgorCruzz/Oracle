"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindRegionsService {
  async execute({ page, limit, nm_region }) {
    const repository = new (0, _repositories.RegionRepository)();

    const findRegions = await repository.findRegions({
      limit,
      page,
      nm_region,
    });

    if (findRegions.length === 0)
      return { error: 'Não há Regiões registradas.' };

    return {
      regions: findRegions,
    };
  }
} exports.FindRegionsService = FindRegionsService;
