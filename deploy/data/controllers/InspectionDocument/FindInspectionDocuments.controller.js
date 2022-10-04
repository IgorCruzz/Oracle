"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class FindInspectionDocumentsController {
  async handle(req, res) {
    try {
      const {
        page,
        limit,
        id,
        id_inspection,
        nm_document,
        nm_file
      } = req.query;

      const service = new (0, _services.FindInspectionDocumentsService)();

      const response = await service.execute({
        page,
        limit,
        id,
        id_inspection,
        nm_document,
        nm_file
      });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      const { count, rows } = response.inspection_documents;

      return res.status(200).json({
        count,
        page,
        limit,
        inspection_documents: rows,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.FindInspectionDocumentsController = FindInspectionDocumentsController;
