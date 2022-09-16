import Sequelize, { Op } from 'sequelize';
import {
  Project,
  Project_phase,
  City,
  Category,
  Timelapse_Coordinates,
  Media_timelapse,
  Product,
  Product_history,
} from '../../database/models';

const formatValue = value =>
  value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export class GetProjectsDataTimelapseService {
  async execute({ id_timelapse_coordinates }) {
    const getTimelapse = await Timelapse_Coordinates.findOne({
      where: {
        id_timelapse_coordinates,
      },
      include: [
        {
          model: Media_timelapse,
          as: 'media_timelapse',
        },
        {
          model: Project_phase,
          as: 'project_phase',
          include: [
            {
              model: Project,
              as: 'project',
              include: [
                {
                  model: Category,
                  as: 'category',
                },
                {
                  model: City,
                  as: 'city',
                },
              ],
            },
          ],
        },
      ],
    });

    // PEGAR A FASE ATUAL

    const project = await Project.findOne({
      where: {
        id_project:
          getTimelapse.dataValues.project_phase.dataValues.project.dataValues
            .id_project,
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
    const ID_PRODUCTS = products.map(product => product.dataValues.id_product);

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

    const project_phase = await Project_phase.findOne({
      where: {
        id_project_phase: sort[0].id_project_phase,
      },
    });

    return {
      projects: {
        id_timelapse_coordinates:
          getTimelapse.dataValues.id_timelapse_coordinates,
        id_project_phase:
          getTimelapse.dataValues.project_phase.id_project_phase,
        actual_project_phase: project_phase.dataValues.nm_project_phase,
        id_project:
          getTimelapse.dataValues.project_phase.dataValues.project.dataValues
            .id_project,
        tx_description:
          getTimelapse.dataValues.project_phase.dataValues.project.dataValues
            .tx_description,
        nm_project:
          getTimelapse.dataValues.project_phase.dataValues.project.dataValues
            .nm_project,
        nm_category:
          getTimelapse.dataValues.project_phase.dataValues.project.dataValues
            .category.dataValues.nm_category,
        nm_city:
          getTimelapse.dataValues.project_phase.dataValues.project.dataValues
            .city.dataValues.nm_city,
        value:
          (getTimelapse.dataValues.project_phase.dataValues.project.dataValues
            .vl_contract &&
            formatValue(
              getTimelapse.dataValues.project_phase.dataValues.project
                .dataValues.vl_contract
            )) ||
          (getTimelapse.dataValues.project_phase.dataValues.project.dataValues
            .vl_bid &&
            formatValue(
              getTimelapse.dataValues.project_phase.dataValues.project
                .dataValues.vl_bid
            )) ||
          (getTimelapse.dataValues.project_phase.dataValues.project.dataValues
            .vl_estimated &&
            formatValue(
              getTimelapse.dataValues.project_phase.dataValues.project
                .dataValues.vl_estimated
            )) ||
          '',
      },
    };
  }
}
