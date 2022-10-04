"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindPolygonAreaService {
  async execute({ id_polygon_area }) {
    const repository = new (0, _repositories.PolygonAreaRepository)();

    const findpolygonArea = await repository.findPolygonAreaById({
      id_polygon_area,
      populate: true,
    });

    if (!findpolygonArea)
      return {
        error: `Não há nenhuma Vértice do polígono da área registrado com este ID -> ${id_polygon_area}.`,
      };

    return {
      polygonArea: findpolygonArea,
    };
  }
} exports.FindPolygonAreaService = FindPolygonAreaService;
