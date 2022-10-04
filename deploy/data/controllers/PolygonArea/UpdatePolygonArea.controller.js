"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class UpdatePolygonAreaController {
  async handle(req, res) {
    try {
      const service = new (0, _services.UpdatePolygonAreaService)();

      const { id_polygon_area } = req.params;

      const response = await service.execute(id_polygon_area, req.body);

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        polygonArea: response.polygonArea,
        message: response.message,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.UpdatePolygonAreaController = UpdatePolygonAreaController;
