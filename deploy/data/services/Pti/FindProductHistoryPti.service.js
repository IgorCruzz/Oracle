"use strict";Object.defineProperty(exports, "__esModule", {value: true});




var _models = require('../../database/models');

 class FindProductHistoryPtiService {
  async execute({ page, limit, id_product }) {
    const findProductHistory = await _models.Product.findAndCountAll({
      limit: limit !== 'all' ? Number(limit) : null,
      offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,

      include: [
        {
          model: _models.Product_history,
          required: true,
          as: 'product_history',
          where: {
            id_product,
          },
          include: [
            {
              model: _models.Professional,
              as: 'professional',
            },
            {
              model: _models.Allocation_period,
              as: 'allocation',
            },
          ],
        },
      ],
    });

    return {
      ptis: findProductHistory,
    };
  }
} exports.FindProductHistoryPtiService = FindProductHistoryPtiService;
