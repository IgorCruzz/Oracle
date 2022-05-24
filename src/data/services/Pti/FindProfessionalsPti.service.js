import { Op } from 'sequelize';
import {
  Allocation,
  // Professional,
  // Role_grade,
  // Role,
  // Grade,
  // Sector,
  // User,
  Allocation_period,
} from '../../database/models';

export class FindProfessionalPtiService {
  async execute({ page, limit, dt_start_allocation, dt_end_allocation }) {
    const findAllocations = await Allocation.findAndCountAll({
      limit: limit !== 'all' ? Number(limit) : null,
      offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
      where: {
        id_professional: 1,
      },
      include: [
        {
          model: Allocation_period,
          as: 'allocation_period',
          where: {
            [Op.and]: {
              dt_start_allocation: {
                [Op.gte]: new Date(dt_start_allocation),
              },
              dt_end_allocation: {
                [Op.lte]: new Date(dt_end_allocation),
              },
            },
          },
        },
      ],
    });

    return {
      ptis: findAllocations,
    };
  }
}
