"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class FindAllocationsController {
  async handle(req, res) {
    try {
      const {
        page,
        limit,
        cd_priority,
        id_project,
        id_project_phase,
        nm_product,
        id_suggested_role,
        id_professional,
        id_allocation_period,
        wt_alocation,
        on_production,
        in_correction,
        in_analisys,
        in_analisysCorretion,
        concluded,
        allProducts,
      } = req.query;

      const service = new (0, _services.FindAllocationsService)();

      const response = await service.execute({
        page,
        limit,
        cd_priority,
        id_project,
        id_project_phase,
        nm_product,
        id_suggested_role,
        id_professional,
        id_allocation_period,
        wt_alocation,
        on_production,
        in_correction,
        in_analisys,
        in_analisysCorretion,
        concluded,
        allProducts,
      });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      const { count, rows } = response.allocations;

      return res.status(200).json({
        count,
        page,
        limit,
        allocations: rows,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.FindAllocationsController = FindAllocationsController;
