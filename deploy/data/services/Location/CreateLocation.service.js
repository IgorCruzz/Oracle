"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _repositories = require('../../database/repositories');

 class CreateLocationService {
  async execute(data) {
    const { id_project } = data;

    const repository = new (0, _repositories.LocationRepository)();
    const projectRepository = new (0, _repositories.ProjectRepository)();

    const verifyProjectExists = await projectRepository.findProjectById({
      id_project,
    });

    if (!verifyProjectExists || verifyProjectExists.dt_deleted_at)
      return {
        error: `Não há nenhum Projeto registrado com este ID -> ${id_project}.`,
      };

    const verifyLocationExists = await repository.findLocation(data);

    if (verifyLocationExists) {
      return {
        error: 'Já existe uma Localização da Obra com este endereço.',
      };
    }

    const location = await repository.createLocation(data);

    return {
      message: 'Localização da Obra registrada com sucesso!',
      location,
    };
  }
} exports.CreateLocationService = CreateLocationService;
