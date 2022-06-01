import { format } from 'date-fns';
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
} from '../../database/models';

export class FindProfessionalPtiService {
  async execute({ page, limit, id_allocation_period, id_professional }) {
    const findAllocations = await Allocation.findAndCountAll({
      limit: limit !== 'all' ? Number(limit) : null,
      offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
      where: {
        id_professional,
      },
      include: [
        {
          model: Allocation_period,
          as: 'allocation_period',
          where: { id_allocation_period },
        },
        {
          model: Product,
          as: 'product',

          include: [
            {
              model: Product_history,
              as: 'product_history',
            },
            {
              model: Project_phase,
              as: 'project_phase',

              include: [
                {
                  model: Project,
                  as: 'project',
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
        { model: Role, as: 'role' },
        { model: Grade, as: 'grade' },
        { model: Sector, as: 'sector' },
      ],
    });

    const getAllocations = findAllocations.rows.map(allocation => {
      const all = allocation.dataValues;

      return {
        period: `${format(
          new Date(all.allocation_period.dataValues.dt_start_allocation),
          'dd/MM/yyyy'
        )} - ${format(
          new Date(all.allocation_period.dataValues.dt_end_allocation),
          'dd/MM/yyyy'
        )} (${all.allocation_period.dataValues.qt_business_hours}h)`,
        professional: all.professional.dataValues.nm_professional,
        products: all.product.dataValues,
        tp_action_picture: all.tp_action_picture,
        qt_hours_picture: all.qt_hours_picture,
      };
    });

    return {
      ptis: {
        count: findAllocations.count,
        rows: { getAllocations },
      },
    };
  }
}
