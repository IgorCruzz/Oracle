"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class FindAllocationController {
  async handle(req, res) {
    try {
      const { id_allocation } = req.params;

      const service = new (0, _services.FindAllocationService)();

      const response = await service.execute({ id_allocation });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        allocation: response.allocation,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.FindAllocationController = FindAllocationController;
