"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindPolygonAreasService {
  async execute({ page, limit, id_location }) {
    const repository = new (0, _repositories.PolygonAreaRepository)();

    const findPolygonAreas = await repository.findPolygonAreas({
      limit,
      page,
      id_location,
    });

    if (findPolygonAreas.length === 0)
      return {
        error: 'Não há nenhuma Vértice do polígono da área registrada.',
      };

    return {
      polygonAreas: findPolygonAreas,
    };
  }
} exports.FindPolygonAreasService = FindPolygonAreasService;
