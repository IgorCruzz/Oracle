"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class UpdateAllocationPeriodController {
  async handle(req, res) {
    try {
      const service = new (0, _services.UpdateAllocationPeriodService)();

      const { id_allocation_period } = req.params;

      const response = await service.execute(id_allocation_period, req.body);

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        allocationPeriod: response.allocationPeriod,
        message: response.message,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.UpdateAllocationPeriodController = UpdateAllocationPeriodController;
