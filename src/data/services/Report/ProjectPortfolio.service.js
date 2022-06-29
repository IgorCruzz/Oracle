import {
  Project,
  Project_phase,
  Product,
  Product_history,
} from '../../database/models';

export class ProjectPortfolioService {
  async execute({ page, limit, id_region, id_city, cd_priority }) {
    const projects = await Project.findAndCountAll({
      limit: limit !== 'all' ? Number(limit) : null,
      offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
      attributes: [
        'id_project',
        'nm_project',
        'cd_sei',
        'cd_priority',
        'qt_m2',
      ],
      include: [
        {
          model: Project_phase,
          as: 'project_phase',
          include: [
            {
              model: Product,
              as: 'product',
              include: [
                {
                  model: Product_history,
                  as: 'product_history',
                },
              ],
            },
          ],
        },
      ],
    });

    const projectsData = projects.rows.map(project => {
      return { ...project.dataValues };
    });

    return {
      projects: {
        count: projects.count,
        rows: projectsData,
      },
    };
  }
}
