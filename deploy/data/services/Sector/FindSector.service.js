"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindSectorService {
  async execute({ id_sector }) {
    const repository = new (0, _repositories.SectorRepository)();

    const findSector = await repository.findSectorById({
      id_sector,
    });

    if (!findSector)
      return { error: `Não existe um Setor com este ID -> ${id_sector}.` };

    return {
      sector: findSector,
    };
  }
} exports.FindSectorService = FindSectorService;
