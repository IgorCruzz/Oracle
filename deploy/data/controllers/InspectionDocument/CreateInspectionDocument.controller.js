"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class CreateInspectionDocumentController {
  async handle(req, res) {
    try {
      const service = new (0, _services.CreateInspectionDocumentService)();
      const response = await service.execute(req);

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
        inspection_document: response.inspection_document,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.CreateInspectionDocumentController = CreateInspectionDocumentController;
