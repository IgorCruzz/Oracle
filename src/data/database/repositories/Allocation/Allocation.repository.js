import { Op } from 'sequelize';
import {
  Allocation,
  Allocation_period,
  Product,
  Professional,
  Role,
  Grade,
  Sector,
} from '../../models';

export class AllocationRepository {
  async createAllocation(data) {
    const createdAllocation = await Allocation.create({
      ...data,
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Allocation.findOne({
      where: {
        id_allocation: createdAllocation.dataValues.id_allocation,
      },
    });
  }

  async findAllocations({
    page,
    limit,
    tp_action_picture,
    qt_hours_picture,
    vl_salary_picture,
    vl_hour_cost_foto,
    id_allocation_period,
    id_product,
    id_professional,
    id_role_picture,
    id_grade_picture,
    id_sector_picture,
  }) {
    let searchQuery;

    if (
      tp_action_picture ||
      qt_hours_picture ||
      vl_salary_picture ||
      vl_hour_cost_foto ||
      id_allocation_period ||
      id_product ||
      id_professional ||
      id_role_picture ||
      id_grade_picture ||
      id_sector_picture
    ) {
      searchQuery = {
        ...(tp_action_picture && {
          tp_action_picture: { [Op.like]: `%${tp_action_picture.trim()}%` },
        }),
        ...(qt_hours_picture && {
          qt_hours_picture: { [Op.like]: `%${qt_hours_picture.trim()}%` },
        }),
        ...(vl_salary_picture && {
          vl_salary_picture: { [Op.like]: `%${vl_salary_picture.trim()}%` },
        }),
        ...(vl_hour_cost_foto && {
          vl_hour_cost_foto: { [Op.like]: `%${vl_hour_cost_foto.trim()}%` },
        }),
        ...(id_allocation_period && {
          id_allocation_period: {
            [Op.like]: `%${id_allocation_period.trim()}%`,
          },
        }),
        ...(id_product && {
          id_product: { [Op.like]: `%${id_product.trim()}%` },
        }),
        ...(vl_salary_picture && {
          vl_salary_picture: { [Op.like]: `%${vl_salary_picture.trim()}%` },
        }),
        ...(vl_hour_cost_foto && {
          vl_hour_cost_foto: { [Op.like]: `%${vl_hour_cost_foto.trim()}%` },
        }),
        ...(id_allocation_period && {
          id_allocation_period: {
            [Op.like]: `%${id_allocation_period.trim()}%`,
          },
        }),
        ...(id_product && {
          id_product: { [Op.like]: `%${id_product.trim()}%` },
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
      ...(limit !== 'all' && { limit: Number(limit) }),
      offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : 1,
      include: [
        id_allocation_period
          ? {
              model: Allocation_period,
              as: 'allocation_period',
              where: { id_allocation_period },
            }
          : { model: Allocation_period, as: 'allocation_period' },
        id_product
          ? {
              model: Product,
              as: 'product',
              where: { id_product },
            }
          : { model: Product, as: 'product' },
        id_professional
          ? {
              model: Professional,
              as: 'professional',
              where: { id_professional },
            }
          : { model: Professional, as: 'professional' },
        id_role_picture
          ? {
              model: Role,
              as: 'role',
              where: { id_role_picture },
            }
          : { model: Role, as: 'role' },
        id_grade_picture
          ? {
              model: Grade,
              as: 'grade',
              where: { id_grade_picture },
            }
          : { model: Grade, as: 'grade' },
        id_sector_picture
          ? {
              model: Sector,
              as: 'sector',
              where: { id_sector_picture },
            }
          : { model: Sector, as: 'sector' },
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

  async findAllocationById({ id_allocation }) {
    return await Allocation.findOne({
      where: {
        id_allocation,
      },
      raw: true,
    });
  }

  async deleteAllocation({ id_allocation }) {
    await Allocation.destroy({
      where: { id_allocation },
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
