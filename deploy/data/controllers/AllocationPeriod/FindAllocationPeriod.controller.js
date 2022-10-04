"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class FindAllocationPeriodController {
  async handle(req, res) {
    try {
      const { id_allocation_period } = req.params;

      const service = new (0, _services.FindAllocationPeriodService)();

      const response = await service.execute({ id_allocation_period });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        allocationPeriod: response.allocationPeriod,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.FindAllocationPeriodController = FindAllocationPeriodController;
