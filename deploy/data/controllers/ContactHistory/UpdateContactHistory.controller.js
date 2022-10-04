"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class UpdateContactHistoryController {
  async handle(req, res) {
    try {
      const service = new (0, _services.UpdateContactHistoryService)();

      const { id_contact_history } = req.params;

      const response = await service.execute(id_contact_history, req.body);

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
        contactHistory: response.contactHistory,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.UpdateContactHistoryController = UpdateContactHistoryController;
