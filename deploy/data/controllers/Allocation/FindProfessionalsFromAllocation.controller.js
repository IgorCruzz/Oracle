"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class FindProfessionalsFromAllocationController {
  async handle(req, res) {
    try {
      const {
        page,
        limit,
        nm_professional,
        id_role,
        id_grade,
        id_sector,
        id_allocation_period,
      } = req.query;

      const service = new (0, _services.FindProfessionalsFromAllocationService)();

      const response = await service.execute({
        page,
        limit,
        nm_professional,
        id_role,
        id_grade,
        id_sector,
        id_allocation_period,
      });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      const { count, rows } = response.professionals;

      return res.status(200).json({
        count,
        page,
        limit,
        professionals: rows.getProfessionals,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.FindProfessionalsFromAllocationController = FindProfessionalsFromAllocationController;
