"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindSectoriesService {
  async execute({ page, limit, nm_sector }) {
    const repository = new (0, _repositories.SectorRepository)();

    const findSectories = await repository.findSectories({
      limit,
      page,
      nm_sector,
    });

    if (findSectories.length === 0)
      return { error: 'Não há nenhum Setor registrado.' };

    return {
      sectories: findSectories,
    };
  }
} exports.FindSectoriesService = FindSectoriesService;
