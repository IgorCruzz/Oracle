"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class FindPolygonAreaController {
  async handle(req, res) {
    try {
      const { id_polygon_area } = req.params;

      const service = new (0, _services.FindPolygonAreaService)();

      const response = await service.execute({ id_polygon_area });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        polygonArea: response.polygonArea,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.FindPolygonAreaController = FindPolygonAreaController;
