"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class DeletePolygonAreaController {
  async handle(req, res) {
    try {
      const service = new (0, _services.DeletePolygonAreaService)();
      const { id_polygon_area } = req.params;

      const response = await service.execute({ id_polygon_area });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.DeletePolygonAreaController = DeletePolygonAreaController;
