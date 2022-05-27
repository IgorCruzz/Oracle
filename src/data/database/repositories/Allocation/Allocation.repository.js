import { Op } from 'sequelize';
import {
  Allocation,
  Allocation_period,
  Product,
  Professional,
  Role,
  Grade,
  Sector,
  Project_phase,
  Project,
  User,
  Product_history,
} from '../../models';

export class AllocationRepository {
  async createAllocation(data) {
    const { transaction, ...rest } = data;

    const createdAllocation = await Allocation.create(
      {
        ...rest,
        dt_created_at: new Date(Date.now()).toISOString(),
        dt_updated_at: new Date(Date.now()).toISOString(),
      },
      {
        ...(transaction && { transaction }),
      }
    );

    return await Allocation.findOne({
      where: {
        id_allocation: createdAllocation.dataValues.id_allocation,
      },
      ...(transaction && { transaction }),
    });
  }

  async verifyRelationProfessional({ id_professional }) {
    return await Allocation.findAll({
      include: [
        {
          model: Professional,
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

    return await Allocation.findAndCountAll({
      where: searchQuery
        ? {
            [Op.and]: searchQuery,
          }
        : {},
      limit: limit !== 'all' ? Number(limit) : null,
      offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
      include: [
        {
          model: Allocation_period,
          as: 'allocation_period',
          where: id_allocation_period
            ? {
                id_allocation_period,
              }
            : {},
        },
        {
          model: Product,
          as: 'product',

          where: nm_product
            ? {
                [Op.or]: [{ tp_required_action: 1 }, { tp_required_action: 2 }],
                nm_product,
              }
            : {
                [Op.or]: [
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
              model: Product_history,
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
                [Op.or]: [
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
              model: Project_phase,
              as: 'project_phase',

              where: id_project_phase ? { id_project_phase } : {},
              include: [
                {
                  model: Project,
                  as: 'project',

                  where:
                    cd_priority || id_project
                      ? {
                          [Op.and]: [
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
          model: Professional,
          as: 'professional',

          include: [
            {
              model: User,
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
          model: Role,
          as: 'role',
        },
        { model: Grade, as: 'grade' },
        { model: Sector, as: 'sector' },
      ],
    });
  }

  async findAllocation({ id_allocation_period, id_professional, id_product }) {
    console.log(id_professional);
    return await Allocation.findOne({
      where: {
        [Op.and]: {
          id_allocation_period,
          // id_professional,
          id_product,
        },
      },
      raw: true,
    });
  }

  async findAllocationById({ id_allocation, transaction }) {
    return await Allocation.findOne({
      where: {
        id_allocation,
      },
      ...(transaction && { transaction }),
      raw: true,
    });
  }

  async deleteAllocation({ id_allocation, transaction }) {
    await Allocation.destroy({
      where: { id_allocation },
      ...(transaction && { transaction }),
    });
  }

  async updateAllocation(id_allocation, data) {
    const location = await Allocation.findOne({
      where: {
        id_allocation,
      },
    });

    await location.update({
      ...data,
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Allocation.findOne({
      where: {
        id_allocation: location.dataValues.id_allocation,
      },
    });
  }
}
