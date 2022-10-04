"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _repositories = require('../../database/repositories');

 class DeleteSectorService {
  async execute({ id_sector }) {
    const repository = new (0, _repositories.SectorRepository)();
    const professionalRepository = new (0, _repositories.ProfessionalRepository)();

    const verifySectorExists = await repository.findSectorById({
      id_sector,
    });

    if (!verifySectorExists)
      return { error: `Não existe um Setor com este ID -> ${id_sector}.` };

    const verifyFkFromProfessional = await professionalRepository.verifyRelationSector(
      {
        id_sector,
      }
    );

    if (verifyFkFromProfessional.length > 0) {
      return {
        error:
          'Não foi possível excluir o Setor pois existem Colaboradores associados.',
      };
    }

    await repository.deleteSector({
      id_sector,
    });

    return {
      message: 'Setor excluído com sucesso!',
    };
  }
} exports.DeleteSectorService = DeleteSectorService;
