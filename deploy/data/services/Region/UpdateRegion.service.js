"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class UpdateRegionService {
  async execute({ name, id }) {
    const repository = new (0, _repositories.RegionRepository)();

    const verifyRegionExists = await repository.findRegionById({
      id,
    });

    if (!verifyRegionExists)
      return {
        error: `Não existe uma Região registrada com este ID -> ${id}.`,
      };

    const verifyRegionName = await repository.findRegion({
      name,
    });

    if (verifyRegionName && verifyRegionName.id_region !== Number(id))
      return { error: 'Já existe uma Região registrada com este nome.' };

    const programUpdated = await repository.updateRegion({
      id,
      name,
    });

    return {
      region: programUpdated,
      message: 'Região atualizada com sucesso!',
    };
  }
} exports.UpdateRegionService = UpdateRegionService;
