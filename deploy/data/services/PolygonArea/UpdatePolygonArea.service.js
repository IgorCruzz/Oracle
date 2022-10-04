"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _repositories = require('../../database/repositories');

 class UpdatePolygonAreaService {
  async execute(id_polygon_area, data) {
    const { id_location } = data;

    const repository = new (0, _repositories.PolygonAreaRepository)();
    const locationRepository = new (0, _repositories.LocationRepository)();
    let locationExists;

    const verifyPolygonAreaExists = await repository.findPolygonAreaById({
      id_polygon_area,
    });

    if (!verifyPolygonAreaExists)
      return {
        error: `Não há nenhuma Vértice do polígono da área registrada com este ID -> ${id_polygon_area}.`,
      };

    if (id_location) {
      locationExists = await locationRepository.findLocationById({
        id_location,
      });

      if (!locationExists) {
        return {
          error: `Não há nenhuma Localização da Obras registrado com este ID -> ${id_location}.`,
        };
      }
    }

    const polygonAreaExists = await repository.findPolygonArea(data);

    if (
      polygonAreaExists &&
      polygonAreaExists.id_polygon_area !== Number(id_polygon_area)
    ) {
      return {
        error: `Já existe uma Vértice do polígono da área registrado com estes dados para a Localização da Obra com o ID -> ${locationExists.id_location} `,
      };
    }

    const polygonAreaUpdated = await repository.updatePolygonArea(
      id_polygon_area,
      data
    );

    return {
      message: 'Vértice do Polígono da Área atualizado com sucesso!',
      polygonArea: polygonAreaUpdated,
    };
  }
} exports.UpdatePolygonAreaService = UpdatePolygonAreaService;
