"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _repositories = require('../../database/repositories');

 class UpdateLocationService {
  async execute(id_location, data) {
    const { id_project } = data;

    const repository = new (0, _repositories.LocationRepository)();
    const projectRepository = new (0, _repositories.ProjectRepository)();

    if (id_project) {
      const projectExists = await projectRepository.findProjectById({
        id_project,
      });

      if (!projectExists || projectExists.dt_deleted_at) {
        return {
          error: `Não há nenhum Projeto registrado com este ID -> ${id_project}.`,
        };
      }
    }

    const verifyLocationId = await repository.findLocationById({
      id_location,
    });

    if (!verifyLocationId) {
      return {
        error: `Não há nenhuma Localização da Obra registrada com este ID -> ${id_location}.`,
      };
    }

    const verifyLocationExists = await repository.findLocation(data);

    if (
      verifyLocationExists &&
      verifyLocationExists.id_location !== Number(id_location)
    ) {
      return {
        error: 'Já existe uma Localização da Obra com este endereço.',
      };
    }

    const LocationUpdated = await repository.updateLocation(id_location, data);

    return {
      message: 'Localização da Obra atualizada com sucesso!',
      location: LocationUpdated,
    };
  }
} exports.UpdateLocationService = UpdateLocationService;
