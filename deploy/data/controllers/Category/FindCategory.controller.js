"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class FindCategoryController {
  async handle(req, res) {
    try {
      const { id } = req.params;

      const service = new (0, _services.FindCategoryService)();

      const response = await service.execute({ id });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        category: response.category,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.FindCategoryController = FindCategoryController;
