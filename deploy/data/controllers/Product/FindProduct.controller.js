"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class FindProductController {
  async handle(req, res) {
    try {
      const { id_product } = req.params;

      const service = new (0, _services.FindProductService)();

      const response = await service.execute({ id_product });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        product: response.product,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.FindProductController = FindProductController;
