import { Op } from 'sequelize';
import {
  Product_history,
  Professional,
  Product,
  Project_phase,
  Project,
} from '../../database/models';

export class FindProductHistoryPtiFromProfessionalService {
  async execute({ page, limit, id_professional }) {
    const findProductHistory = await Product_history.findAndCountAll({
      limit: limit !== 'all' ? Number(limit) : null,
      offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
      order: [['dt_status', 'ASC']],
      where: {
        [Op.or]: [
          { id_previous_professional: id_professional },
          { id_professional },
        ],
      },
      include: [
        { model: Professional, as: 'professional' },
        { model: Professional, as: 'old_professional' },
        {
          model: Product,
          as: 'product',
          include: [
            {
              model: Project_phase,
              as: 'project_phase',
              include: [{ model: Project, as: 'project' }],
            },
          ],
        },
      ],
    });

    return {
      ptis: findProductHistory,
    };
  }
}
