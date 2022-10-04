"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class FindCategoriesController {
  async handle(req, res) {
    try {
      const { page, limit, nm_category } = req.query;

      const service = new (0, _services.FindCategoriesService)();

      const response = await service.execute({ page, limit, nm_category });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      const { count, rows } = response.categories;

      return res.status(200).json({
        count,
        page,
        limit,
        categories: rows,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.FindCategoriesController = FindCategoriesController;
