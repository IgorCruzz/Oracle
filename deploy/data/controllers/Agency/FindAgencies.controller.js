"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class FindAgenciesController {
  async handle(req, res) {
    try {
      const { page, limit, jurisdictionId, nm_agency } = req.query;

      const service = new (0, _services.FindAgenciesService)();

      const response = await service.execute({
        page,
        limit,
        jurisdictionId,
        nm_agency,
      });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      const { count, rows } = response.agencies;

      return res.status(200).json({
        count,
        page,
        limit,
        agencies: rows,
      });
    } catch (err) {
      console.log({ err });
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.FindAgenciesController = FindAgenciesController;
