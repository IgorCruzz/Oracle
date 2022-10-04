"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');







var _models = require('../../database/models');

 class FindProductHistoryPtiFromProfessionalService {
  async execute({ page, limit, id_professional }) {
    const findProductHistory = await _models.Product_history.findAndCountAll({
      limit: limit !== 'all' ? Number(limit) : null,
      offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
      order: [['dt_status', 'ASC']],
      where: {
        [_sequelize.Op.or]: [
          { id_previous_professional: id_professional },
          { id_professional },
        ],
      },
      include: [
        {
          model: _models.Allocation_period,
          as: 'allocation',
          attributes: [
            'dt_start_allocation',
            'dt_end_allocation',
            'qt_business_hours',
          ],
        },
        { model: _models.Professional, as: 'professional' },
        { model: _models.Professional, as: 'old_professional' },
        {
          model: _models.Product,
          as: 'product',
          include: [
            {
              model: _models.Project_phase,
              as: 'project_phase',
              include: [{ model: _models.Project, as: 'project' }],
            },
          ],
        },
      ],
    });

    return {
      ptis: findProductHistory,
    };
  }
} exports.FindProductHistoryPtiFromProfessionalService = FindProductHistoryPtiFromProfessionalService;
