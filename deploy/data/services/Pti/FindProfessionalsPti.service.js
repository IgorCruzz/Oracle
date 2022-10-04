"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _datefns = require('date-fns');












var _models = require('../../database/models');

 class FindProfessionalPtiService {
  async execute({ page, limit, id_allocation_period, id_professional }) {
    const findAllocations = await _models.Allocation.findAndCountAll({
      limit: limit !== 'all' ? Number(limit) : null,
      offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
      where: {
        id_professional,
      },
      distinct: true,
      include: [
        {
          model: _models.Allocation_period,
          as: 'allocation_period',
          where: { id_allocation_period },
        },
        {
          model: _models.Product,
          as: 'product',

          include: [
            {
              model: _models.Product_history,
              as: 'product_history',
            },
            {
              model: _models.Project_phase,
              as: 'project_phase',

              include: [
                {
                  model: _models.Project,
                  as: 'project',
                },
              ],
            },
          ],
        },
        {
          model: _models.Professional,
          as: 'professional',

          include: [
            {
              model: _models.User,
              as: 'user',
              attributes: [
                'id_user',
                'ds_email_login',
                'nm_user',
                'dt_created_at',
                'dt_updated_at',
                'tp_profile',
                'in_active',
              ],
            },
          ],
        },
        { model: _models.Role, as: 'role' },
        { model: _models.Grade, as: 'grade' },
        { model: _models.Sector, as: 'sector' },
      ],
    });

    const getAllocations = findAllocations.rows.map(allocation => {
      const all = allocation.dataValues;

      return {
        period: `${_datefns.format.call(void 0, 
          new Date(all.allocation_period.dataValues.dt_start_allocation),
          'dd/MM/yyyy'
        )} - ${_datefns.format.call(void 0, 
          new Date(all.allocation_period.dataValues.dt_end_allocation),
          'dd/MM/yyyy'
        )} (${all.allocation_period.dataValues.qt_business_hours}h)`,
        professional: all.professional.dataValues.nm_professional,
        products: all.product.dataValues,
        tp_action_picture: all.tp_action_picture,
        qt_hours_picture: all.qt_hours_picture,
      };
    });

    return {
      ptis: {
        count: findAllocations.count,
        rows: { getAllocations },
      },
    };
  }
} exports.FindProfessionalPtiService = FindProfessionalPtiService;
