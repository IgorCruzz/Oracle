"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class DeleteRegionService {
  async execute({ id }) {
    const repository = new (0, _repositories.RegionRepository)();
    const cityRepository = new (0, _repositories.CityRepository)();

    const verifyRegionExists = await repository.findRegionById({
      id,
    });

    if (!verifyRegionExists)
      return {
        error: `Não existe uma Região registrada com este ID -> ${id}.`,
      };

    const verifyFk = await cityRepository.verifyRegion({ regionId: id });

    if (verifyFk.length > 0) {
      return {
        error:
          'Não foi possível excluir a Região pois existem Municípios associados.',
      };
    }

    await repository.deleteRegion({
      id,
    });

    return {
      message: 'Região excluída com sucesso!',
    };
  }
} exports.DeleteRegionService = DeleteRegionService;
