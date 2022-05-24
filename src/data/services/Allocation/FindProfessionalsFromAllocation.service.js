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
    id_allocation_period,
    nm_professional,
    id_role,
    id_grade,
    id_sector,
  }) {
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
                id_allocation_period,
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

    const getProfessionals = professionals.rows.map(professional => {
      const prof = professional.dataValues;

      const { allocation } = prof;

      const businessHours = allocation.map(
        values => values.dataValues.qt_hours_picture
      );

      const sumBussinesHours = businessHours.reduce((a, b) => a + b, 0);

      return {
        professional: {
          id_professional: prof.id_professional,
          nm_professional: prof.nm_professional,
          in_delivery_analyst: prof.in_delivery_analyst,
          in_active: prof.in_active,
        },
        role: prof.coustHH.role.dataValues,
        grade: prof.coustHH.role.dataValues,
        allocation_hours: sumBussinesHours,
      };
    });

    return {
      professionals: {
        count: professionals.count,
        rows: { getProfessionals },
      },
    };
  }
}
