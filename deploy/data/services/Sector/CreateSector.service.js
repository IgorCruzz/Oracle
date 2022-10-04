"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class CreateSectorService {
  async execute({ nm_sector }) {
    const repository = new (0, _repositories.SectorRepository)();

    const verifySectorExists = await repository.findSector({
      nm_sector,
    });

    if (verifySectorExists)
      return { error: 'Já existe um Setor registrado com este nome.' };

    const sector = await repository.createSector({ nm_sector });

    return {
      message: 'Setor registrado com sucesso!',
      sector: sector.dataValues,
    };
  }
} exports.CreateSectorService = CreateSectorService;
