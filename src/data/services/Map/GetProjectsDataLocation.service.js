import Sequelize, { Op } from 'sequelize';

import {
  Project,
  Project_phase,
  Product,
  Product_history,
  City,
  Region,
  Location,
  Polygon_area,
  Category,
} from '../../database/models';

const formatValue = value =>
  value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export class GetProjectsDataLocationService {
  async execute({ id_location }) {
    const projects = await Project.findOne({
      attributes: [
        'id_project',
        'nm_project',
        'vl_estimated',
        'vl_bid',
        'vl_contract',
        'tx_description',
      ],

      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['nm_category', 'id_category'],
        },
        {
          model: City,
          as: 'city',
          attributes: ['nm_city'],
          include: [
            {
              model: Region,
              as: 'region',
              attributes: ['nm_region'],
            },
          ],
        },

        {
          model: Location,
          as: 'location',
          where: {
            id_location,
          },
          include: [
            {
              model: Polygon_area,
              as: 'polygon_area',
            },
          ],
        },

        {
          model: Project_phase,
          as: 'project_phase',
          attributes: ['id_project_phase', 'nu_order', 'nm_project_phase'],
          include: [
            {
              model: Product,
              as: 'product',
            },
          ],
        },
      ],
    });

    // PEGAR A FASE ATUAL

    const project = await Project.findOne({
      where: {
        id_project: projects.dataValues.id_project,
      },
      include: [
        {
          model: Project_phase,
          as: 'project_phase',
          attributes: ['id_project_phase', 'nu_order', 'nm_project_phase'],
          include: [
            {
              model: Product,
              as: 'product',
            },
          ],
        },
      ],
    });

    let project_phase;

    if (project.dataValues.project_phase.length > 0) {
      /// SETAR OS ID DAS FASES DO PROJETO EM UM ARRAY
      const ID_PROJECT_PHASES = project.dataValues.project_phase.map(
        result => result.dataValues.id_project_phase
      );

      /// PEGAR OS PRODUTOS REFERENTES AS FASES
      const products = await Product.findAll({
        where: {
          id_project_phase: {
            [Op.in]: ID_PROJECT_PHASES,
          },
        },
      });

      // SETAR OS ID DOS PRODUTOS EM UM ARRAY
      const ID_PRODUCTS = products.map(
        product => product.dataValues.id_product
      );

      // BUSCAR PELO STATUS ATUAL DE CADA PRODUTO
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

      // SETAR OS ID DO HISTORICO DE PRODUTO EM UM ARRAY
      const ID_PRODUCT_HISTORIES = findLastRecord.map(
        ({ id_product_history }) => id_product_history
      );

      const productHistories = await Product_history.findAll({
        where: {
          [Op.and]: {
            id_product_history: {
              [Op.in]: ID_PRODUCT_HISTORIES,
            },
            cd_status: {
              [Op.gt]: 0,
            },
          },
        },
        include: [
          {
            model: Product,
            as: 'product',
          },
        ],
      });

      const projectPhaseWithHistories = productHistories.map(
        ph => ph.dataValues.product.dataValues.id_project_phase
      );

      const reducedArray = projectPhaseWithHistories.reduce((acc, curr) => {
        if (acc.length === 0) acc.push({ id_project_phase: curr, count: 1 });
        else if (acc.findIndex(f => f.id_project_phase === curr) === -1)
          acc.push({ id_project_phase: curr, count: 1 });
        else ++acc[acc.findIndex(f => f.id_project_phase === curr)].count;
        return acc;
      }, []);

      const sort = reducedArray.sort((a, b) => b.count - a.count);

      project_phase = await Project_phase.findOne({
        where: {
          id_project_phase: sort[0].id_project_phase,
        },
      });
    } else {
      project_phase = false;
    }

    return {
      projects: {
        actual_project_phase: !project_phase
          ? ''
          : project_phase.dataValues.nm_project_phase,
        id_project: projects.dataValues.id_project,
        tx_description: projects.dataValues.tx_description,
        nm_project: projects.dataValues.nm_project,
        nm_category: projects.dataValues.category.dataValues.nm_category,
        nm_city: projects.dataValues.city.dataValues.nm_city,
        nu_latitude: projects.dataValues.location[0].dataValues.nu_latitude,
        nu_longitude: projects.dataValues.location[0].dataValues.nu_longitude,
        value:
          (projects.dataValues.vl_contract &&
            formatValue(projects.dataValues.vl_contract)) ||
          (projects.dataValues.vl_bid &&
            formatValue(projects.dataValues.vl_bid)) ||
          (projects.dataValues.vl_estimated &&
            formatValue(projects.dataValues.vl_estimated)) ||
          '',
      },
    };
  }
}
