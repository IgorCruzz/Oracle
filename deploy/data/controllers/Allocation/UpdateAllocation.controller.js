"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class UpdateAllocationController {
  async handle(req, res) {
    try {
      const service = new (0, _services.UpdateAllocationService)();

      const { id_allocation } = req.params;
      const { id_professional } = req.body;

      const response = await service.execute(id_allocation, {
        id_professional,
      });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        allocation: response.allocation,
        message: response.message,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.UpdateAllocationController = UpdateAllocationController;
