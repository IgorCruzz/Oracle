"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');












var _models = require('../../models');

 class AllocationRepository {
  async createAllocation(data) {
    const { transaction, ...rest } = data;

    const createdAllocation = await _models.Allocation.create(
      {
        ...rest,
        dt_created_at: new Date(Date.now()).toISOString(),
        dt_updated_at: new Date(Date.now()).toISOString(),
      },
      {
        ...(transaction && { transaction }),
      }
    );

    return await _models.Allocation.findOne({
      where: {
        id_allocation: createdAllocation.dataValues.id_allocation,
      },
      ...(transaction && { transaction }),
    });
  }

  async verifyRelationAllocationPeriod({ id_allocation_period }) {
    return await _models.Allocation.findAll({
      include: [
        {
          model: _models.Allocation_period,
          as: 'allocation_period',
          where: { id_allocation_period },
        },
      ],
    });
  }

  async verifyRelationProfessional({ id_professional }) {
    return await _models.Allocation.findAll({
      include: [
        {
          model: _models.Professional,
          as: 'professional',
          where: { id_professional },
        },
      ],
    });
  }

  async findAllocations({
    page,
    limit,
    cd_priority,
    id_project,
    id_project_phase,
    nm_product,
    id_suggested_role,
    id_professional,
    id_allocation_period,
    ag_alocation,
    on_production,
    in_correction,
    in_analisys,
    in_analisysCorretion,
    concluded,
  }) {
    let searchQuery;

    if (id_professional || id_suggested_role) {
      searchQuery = {
        ...(id_professional && {
          id_professional,
        }),
        ...(id_suggested_role && { id_role_picture: id_suggested_role }),
      };
    } else {
      searchQuery = null;
    }

    return await _models.Allocation.findAndCountAll({
      where: searchQuery
        ? {
            [_sequelize.Op.and]: searchQuery,
          }
        : {},
      limit: limit !== 'all' ? Number(limit) : null,
      offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
      include: [
        {
          model: _models.Allocation_period,
          as: 'allocation_period',
          where: id_allocation_period
            ? {
                id_allocation_period,
              }
            : {},
        },
        {
          model: _models.Product,
          as: 'product',

          where: nm_product
            ? {
                [_sequelize.Op.or]: [{ tp_required_action: 1 }, { tp_required_action: 2 }],
                nm_product,
              }
            : {
                [_sequelize.Op.or]: [
                  {
                    tp_required_action: 1,
                  },
                  {
                    tp_required_action: 2,
                  },
                ],
              },
          include: [
            {
              model: _models.Product_history,
              as: 'product_history',
              required: !!(
                ag_alocation ||
                on_production ||
                in_correction ||
                in_analisys ||
                in_analisysCorretion ||
                concluded
              ),
              where: {
                [_sequelize.Op.or]: [
                  ag_alocation && { cd_status: 0 },
                  on_production && { cd_status: 1 },
                  in_correction && { cd_status: 2 },
                  in_analisys && { cd_status: 3 },
                  in_analisysCorretion && { cd_status: 4 },
                  concluded && { cd_status: 5 },
                ],
              },
            },
            {
              model: _models.Project_phase,
              as: 'project_phase',

              where: id_project_phase ? { id_project_phase } : {},
              include: [
                {
                  model: _models.Project,
                  as: 'project',

                  where:
                    cd_priority || id_project
                      ? {
                          [_sequelize.Op.and]: [
                            {
                              dt_deleted_at: null,
                              ...(cd_priority && { cd_priority }),
                              ...(id_project && { id_project }),
                            },
                          ],
                        }
                      : {
                          dt_deleted_at: null,
                        },
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
        {
          model: _models.Role,
          as: 'role',
        },
        { model: _models.Grade, as: 'grade' },
        { model: _models.Sector, as: 'sector' },
      ],
    });
  }

  async findAllocation({ id_product }) {
    return await _models.Allocation.findOne({
      where: {
        id_product,
      },
      raw: true,
    });
  }

  async findAllocationToDelete({
    id_product,
    id_professional,
    id_allocation_period,
  }) {
    return await _models.Allocation.findOne({
      where: {
        [_sequelize.Op.and]: [
          { id_product },
          { id_professional },
          { id_allocation_period },
        ],
      },
      raw: true,
    });
  }

  async findAllocationById({ id_allocation, transaction }) {
    return await _models.Allocation.findOne({
      where: {
        id_allocation,
      },
      ...(transaction && { transaction }),
      raw: true,
    });
  }

  async deleteAllocation({ id_allocation, transaction }) {
    await _models.Allocation.destroy({
      where: { id_allocation },
      ...(transaction && { transaction }),
    });
  }

  async updateAllocation(id_allocation, data) {
    const location = await _models.Allocation.findOne({
      where: {
        id_allocation,
      },
    });

    await location.update({
      ...data,
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await _models.Allocation.findOne({
      where: {
        id_allocation: location.dataValues.id_allocation,
      },
    });
  }
} exports.AllocationRepository = AllocationRepository;
