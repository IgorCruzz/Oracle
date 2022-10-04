"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class FindDocumentsController {
  async handle(req, res) {
    try {
      const { page, limit, id_product } = req.query;

      const service = new (0, _services.FindDocumentsService)();

      const response = await service.execute({
        page,
        limit,
        id_product,
      });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      const { count, rows } = response.documents;

      return res.status(200).json({
        count,
        page,
        limit,
        documents: rows,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.FindDocumentsController = FindDocumentsController;
