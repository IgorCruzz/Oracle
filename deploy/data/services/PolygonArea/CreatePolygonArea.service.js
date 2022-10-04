"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _repositories = require('../../database/repositories');

 class CreatePolygonAreaService {
  async execute(data) {
    const { id_location } = data;

    const repository = new (0, _repositories.PolygonAreaRepository)();
    const locationRepository = new (0, _repositories.LocationRepository)();

    const verifyLocationExists = await locationRepository.findLocationById({
      id_location,
    });

    if (!verifyLocationExists)
      return {
        error: `Não há nenhuma Localização da Obra registrada com este ID -> ${id_location}.`,
      };

    const polygonAreaExists = await repository.findPolygonArea(data);

    if (polygonAreaExists) {
      return {
        error: `Já existe uma Vértice do polígono da área registrado com estes dados para a Localização da Obra com o ID -> ${verifyLocationExists.id_location} `,
      };
    }

    const polygonArea = await repository.createPolygonArea(data);

    return {
      message: 'Vértice do Polígono da Área registrado com sucesso!',
      polygonArea,
    };
  }
} exports.CreatePolygonAreaService = CreatePolygonAreaService;
