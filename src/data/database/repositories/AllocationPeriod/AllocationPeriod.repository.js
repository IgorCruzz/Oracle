import { Op } from 'sequelize';
import { Allocation_period } from '../../models';

export class AllocationPeriodRepository {
  async createAllocationPeriod(data) {
    const { dtAllocationStart, dtAllocationEnd, ...rest } = data;

    const createdAllocationPeriod = await Allocation_period.create({
      ...rest,
      dt_start_allocation: dtAllocationStart,
      dt_end_allocation: dtAllocationEnd,
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
    dt_start_allocation_in,
    dt_start_allocation_at,
    dt_end_allocation_in,
    dt_end_allocation_at,
    qt_business_hours,
  }) {
    let searchQuery;

    if (
      dt_start_allocation_in ||
      dt_start_allocation_at ||
      dt_end_allocation_in ||
      dt_end_allocation_at
    ) {
      searchQuery = {
        ...(dt_start_allocation_in &&
          dt_start_allocation_at &&
          !dt_end_allocation_in &&
          !dt_end_allocation_at && {
            dt_start_allocation: {
              [Op.between]: [
                new Date(dt_start_allocation_in),
                new Date(dt_start_allocation_at),
              ],
            },
          }),
        ...(dt_end_allocation_in &&
          dt_end_allocation_at &&
          !dt_start_allocation_in &&
          !dt_start_allocation_at && {
            dt_end_allocation: {
              [Op.between]: [
                new Date(dt_end_allocation_in),
                new Date(dt_end_allocation_at),
              ],
            },
          }),
        ...(dt_start_allocation_in &&
          dt_start_allocation_at &&
          dt_end_allocation_in &&
          dt_end_allocation_at && {
            [Op.and]: [
              {
                dt_start_allocation: {
                  [Op.between]: [
                    new Date(dt_start_allocation_in),
                    new Date(dt_start_allocation_at),
                  ],
                },
                dt_end_allocation: {
                  [Op.between]: [
                    new Date(dt_end_allocation_in),
                    new Date(dt_end_allocation_at),
                  ],
                },
              },
            ],
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
      limit: limit !== 'all' ? Number(limit) : null,
      offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
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
    });
  }

  async deleteAllocationPeriod({ id_allocation_period }) {
    await Allocation_period.destroy({
      where: { id_allocation_period },
    });
  }

  async updateAllocationPeriod(id_allocation_period, data) {
    const { dtAllocationStart, dtAllocationEnd } = data;

    const location = await Allocation_period.findOne({
      where: {
        id_allocation_period,
      },
    });

    await location.update({
      ...data,
      dt_start_allocation: dtAllocationStart,
      dt_end_allocation: dtAllocationEnd,
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Allocation_period.findOne({
      where: {
        id_allocation_period: location.dataValues.id_allocation_period,
      },
    });
  }
}
