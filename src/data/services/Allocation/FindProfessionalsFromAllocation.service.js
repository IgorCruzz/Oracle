import { Op } from 'sequelize';
import {
  Allocation,
  Professional,
  Role_grade,
  Role,
  Grade,
  Sector,
  User,
  Allocation_period,
} from '../../database/models';

export class FindProfessionalsFromAllocationService {
  async execute({
    page,
    limit,
    allocation_period,
    nm_professional,
    id_role,
    id_grade,
    id_sector,
  }) {
    let dt_start_allocation;
    let dt_end_allocation;

    if (allocation_period) {
      const [start, end] = allocation_period.split('/');

      dt_start_allocation = start;
      dt_end_allocation = end;
    }

    let searchQuery;

    if (nm_professional || id_role || id_grade || id_sector) {
      searchQuery = {
        ...(nm_professional && {
          nm_professional: { [Op.like]: `%${nm_professional.trim()}%` },
        }),
        ...(id_role && {
          id_role: { [Op.like]: `%${id_role.trim()}%` },
        }),
        ...(id_grade && {
          id_grade: { [Op.like]: `%${id_grade.trim()}%` },
        }),
        ...(id_sector && {
          id_sector: { [Op.like]: `%${id_sector.trim()}%` },
        }),
      };
    } else {
      searchQuery = null;
    }

    const professionals = await Professional.findAndCountAll({
      where: searchQuery
        ? {
            [Op.and]: searchQuery,
          }
        : {},
      limit: limit !== 'all' ? Number(limit) : null,
      order: [['nm_professional', 'ASC']],
      offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,

      include: [
        {
          model: Allocation,
          as: 'allocation',
          include: [
            {
              model: Allocation_period,
              as: 'allocation_period',
              where: {
                [Op.and]: {
                  dt_start_allocation,
                  dt_end_allocation,
                },
              },
            },
          ],
        },
        {
          model: Role_grade,
          as: 'coustHH',
          include: [
            { model: Role, as: 'role' },
            { model: Grade, as: 'grade' },
          ],
        },
        { model: Sector, as: 'sector' },
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
    });

    return {
      professionals,
    };
  }
}
