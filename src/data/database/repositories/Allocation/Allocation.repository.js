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

  async findAllocations({
    page,
    limit,
    cd_priority,
    id_project,
    id_project_phase,
    nm_product,
    tp_profile,
    id_professional,
    allocation_period,
  }) {
    let dt_start_allocation;
    let dt_end_allocation;

    if (allocation_period) {
      const [start, end] = allocation_period.split('-');

      const [startDay, startMonth, startYear] = start.split('/');
      const [endDay, endMonth, endYear] = end.split('/');

      dt_start_allocation = `${startYear}-${startMonth}-${startDay}`;
      dt_end_allocation = `${endYear}-${endMonth}-${endDay}`;
    }

    let searchQuery;

    if (id_professional) {
      searchQuery = {
        ...(id_professional && {
          id_professional,
        }),
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
          where: allocation_period
            ? {
                [Op.and]: {
                  dt_start_allocation: {
                    [Op.gte]: new Date(dt_start_allocation),
                    [Op.lte]: new Date(dt_end_allocation),
                  },
                },
              }
            : {},
        },
        {
          model: Product,
          as: 'product',
          required: true,
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
              model: Project_phase,
              as: 'project_phase',
              required: true,
              where: id_project_phase ? { id_project_phase } : {},
              include: [
                {
                  model: Project,
                  as: 'project',
                  required: true,
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
          required: true,
          include: [
            {
              model: User,
              as: 'user',
              required: true,
              where: tp_profile ? { tp_profile } : {},
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
        { model: Role, as: 'role' },
        { model: Grade, as: 'grade' },
        { model: Sector, as: 'sector' },
      ],
    });
  }

  async findAllocation({ id_allocation_period, id_professional, id_product }) {
    return await Allocation.findOne({
      where: {
        [Op.and]: {
          id_allocation_period,
          id_professional,
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
