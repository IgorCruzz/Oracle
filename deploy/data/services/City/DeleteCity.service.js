"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class DeleteCityService {
  async execute({ id }) {
    const repository = new (0, _repositories.CityRepository)();
    const projectRepository = new (0, _repositories.ProjectRepository)();

    const verifyCityExists = await repository.findCityById({
      id,
    });

    if (!verifyCityExists)
      return {
        error: `Não existe um Município registrado com este ID -> ${id}.`,
      };

    const verifyFk = await projectRepository.verifyRelationCity({
      id_city: id,
    });

    if (verifyFk.length > 0) {
      return {
        error:
          'Não foi possível excluir o Município pois existem Projetos associados.',
      };
    }

    await repository.deleteCity({
      id,
    });

    return {
      message: 'Município excluído com sucesso!',
    };
  }
} exports.DeleteCityService = DeleteCityService;
