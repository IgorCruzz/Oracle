"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');












var _models = require('../../database/models');

 class FindPeriodPtiService {
  async execute({
    page,
    limit,
    id_allocation_period,
    nm_professional,
    id_role,
    id_grade,
    id_sector,
    user_alocated,
  }) {
    let searchQuery;

    if (nm_professional) {
      searchQuery = {
        ...(nm_professional && {
          nm_professional: { [_sequelize.Op.like]: `%${nm_professional.trim()}%` },
        }),
      };
    } else {
      searchQuery = null;
    }

    const professionals = await _models.Professional.findAndCountAll({
      where: searchQuery
        ? {
            [_sequelize.Op.and]: [...(searchQuery ? { searchQuery } : null)],
          }
        : null,
      limit: limit !== 'all' ? Number(limit) : null,
      order: [['nm_professional', 'ASC']],
      offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
      distinct: true,
      include: [
        {
          model: _models.Allocation,
          as: 'allocation',
          required: !user_alocated,
          where: id_allocation_period
            ? {
                [_sequelize.Op.and]: [
                  {
                    id_allocation_period,
                  },
                ],
              }
            : {},

          include: [
            {
              model: _models.Product,
              as: 'product',

              include: [
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
              model: _models.Allocation_period,

              as: 'allocation_period',
            },
          ],
        },
        {
          model: _models.Role_grade,
          as: 'coustHH',
          where:
            id_role || id_grade
              ? {
                  ...(id_role && { id_role }),
                  ...(id_grade && { id_grade }),
                }
              : {},
          include: [
            { model: _models.Role, as: 'role' },
            { model: _models.Grade, as: 'grade' },
          ],
        },
        {
          model: _models.Sector,
          as: 'sector',
          where: id_sector ? { id_sector } : null,
        },
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
    });

    const getProfessionals = professionals.rows.map(professional => {
      const prof = professional.dataValues;

      const { allocation } = prof;

      const businessHours = allocation
        .map(values => {
          return values.dataValues.product.dataValues.project_phase.dataValues
            .project.dataValues.nm_deleted_by === null
            ? values.dataValues.qt_hours_picture
            : false;
        })
        .filter(Boolean);

      const sumBussinesHours = businessHours.reduce((a, b) => a + b, 0);

      return {
        professional: {
          id_professional: prof.id_professional,
          nm_professional: prof.nm_professional,
          in_delivery_analyst: prof.in_delivery_analyst === 'S' ? 'X' : '',
          in_active: prof.in_active,
        },
        role: prof.coustHH.role.dataValues,
        grade: prof.coustHH.grade.dataValues,
        allocation_hours: sumBussinesHours.toFixed(2),
      };
    });

    if (!user_alocated) {
      return {
        ptis: {
          count: professionals.count,
          rows: {
            getProfessionals: getProfessionals.filter(
              a => a.allocation_hours > 0
            ),
          },
        },
      };
    }

    return {
      ptis: {
        count: getProfessionals.length,
        rows: { getProfessionals },
      },
    };
  }
} exports.FindPeriodPtiService = FindPeriodPtiService;
