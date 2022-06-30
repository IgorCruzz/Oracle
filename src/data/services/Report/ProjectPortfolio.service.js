import Sequelize, { Op } from 'sequelize';
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
          attributes: ['id_project_phase', 'nu_order', 'nm_project_phase'],
        },
      ],
    });

    const projectsData = projects.rows.map(async project => {
      const ID_PROJECT_PHASES = project.dataValues.project_phase.map(
        project2 => project2.dataValues.id_project_phase
      );

      const products = await Product.findAll({
        where: {
          id_project_phase: {
            [Op.in]: ID_PROJECT_PHASES,
          },
        },
      });

      const ID_PRODUCTS = products.map(
        product => product.dataValues.id_product
      );

      const findLastRecord = await Product_history.findAll({
        attributes: [
          [
            Sequelize.fn('MAX', Sequelize.col('id_product_history')),
            'id_product_history',
          ],
        ],
        group: Sequelize.col('id_product'),
        raw: true,
        having: {
          id_product: {
            [Op.in]: ID_PRODUCTS,
          },
        },
      });

      const values = findLastRecord.map(
        ({ id_product_history }) => id_product_history
      );

      const productHistories = await Product_history.findAll({
        where: {
          id_product_history: {
            [Op.in]: values,
          },
        },
        include: [
          {
            model: Product,
            as: 'product',
          },
        ],
      });

      const prfkrrfr = productHistories.map(ph => ({
        PROJECT_PHASE_ID: ph.dataValues.product.dataValues.id_project_phase,
        PRODUCT_ID: ph.dataValues.product.id_product,
      }));

      console.log({
        project_phase_que_possui_status: prfkrrfr,
        ID_PROJECT_PHASES,
      });

      return { value: project.dataValues.vl_contract, ...project.dataValues };
    });

    return {
      projects: {
        count: projects.count,
        rows: projectsData,
      },
    };
  }
}
