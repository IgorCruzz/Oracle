import { Op } from 'sequelize';
import { Allocation_period } from '../../models';

export class AllocationPeriodRepository {
  async createAllocationPeriod(data) {
    const createdAllocationPeriod = await Allocation_period.create({
      ...data,
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Allocation_period.findOne({
      where: {
        id_allocation_period:
          createdAllocationPeriod.dataValues.id_allocation_period,
      },
    });
  }

  async findAllocationPeriods({
    page,
    limit,
    dt_start_allocation,
    dt_end_allocation,
    qt_business_hours,
  }) {
    let searchQuery;

    if (dt_start_allocation || dt_end_allocation || qt_business_hours) {
      searchQuery = {
        ...(dt_start_allocation && {
          dt_start_allocation: { [Op.like]: `%${dt_start_allocation.trim()}%` },
        }),
        ...(dt_end_allocation && {
          dt_end_allocation: { [Op.like]: `%${dt_end_allocation.trim()}%` },
        }),
        ...(qt_business_hours && {
          qt_business_hours: { [Op.like]: `%${qt_business_hours.trim()}%` },
        }),
      };
    } else {
      searchQuery = null;
    }

    return await Allocation_period.findAndCountAll({
      where: searchQuery
        ? {
            [Op.and]: searchQuery,
          }
        : {},
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
    });
  }

  async findAllocationPeriod(data) {
    const { dt_start_allocation, dt_end_allocation, qt_business_hours } = data;

    return await Allocation_period.findOne({
      where: {
        [Op.and]: {
          dt_start_allocation,
          dt_end_allocation,
          qt_business_hours,
        },
      },
      raw: true,
    });
  }

  async findAllocationPeriodById({ id_allocation_period }) {
    return await Allocation_period.findOne({
      where: {
        id_allocation_period,
      },
      raw: true,
    });
  }

  async deleteAllocationPeriod({ id_allocation_period }) {
    await Allocation_period.destroy({
      where: { id_allocation_period },
    });
  }

  async updateAllocationPeriod(id_allocation_period, data) {
    const location = await Allocation_period.findOne({
      where: {
        id_allocation_period,
      },
    });

    await location.update({
      ...data,
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Allocation_period.findOne({
      where: {
        id_allocation_period: location.dataValues.id_allocation_period,
      },
    });
  }
}
