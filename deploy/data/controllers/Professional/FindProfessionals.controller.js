"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class FindProfessionalsController {
  async handle(req, res) {
    try {
      const {
        id_role_grade,
        id_role,
        id_grade,
        id_sector,
        id_user,
        in_delivery_analyst,
        nm_professional,
        in_active,
        limit,
        page,
        ds_email_login,
        has_no_association,
      } = req.query;

      const service = new (0, _services.FindProfessionalsService)();

      const response = await service.execute({
        id_role_grade,
        id_sector,
        id_user,
        in_delivery_analyst,
        in_active,
        nm_professional,
        limit,
        page,
        ds_email_login,
        has_no_association,
        id_role,
        id_grade,
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
        professionals: rows,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.FindProfessionalsController = FindProfessionalsController;
