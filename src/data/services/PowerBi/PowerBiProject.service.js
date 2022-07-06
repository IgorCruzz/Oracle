import Sequelize, { Op } from 'sequelize';
import {
  Project,
  Project_phase,
  City,
  Region,
  Product,
  Location,
  Product_history,
} from '../../database/models';

export class PowerBiProjectService {
  async execute() {
    const projects = await Project.findAll({
      attributes: [
        'id_project',
        'nm_project',
        'cd_sei',
        'cd_priority',
        'qt_m2',
        'vl_estimated',
        'vl_bid',
        'vl_contract',
        'cd_complexity',
        'tx_description',
      ],

      include: [
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
        },
        {
          model: Project_phase,
          as: 'project_phase',
        },
      ],
    });

    const Data = [];

    await Promise.all(
      projects.map(async project => {
        // PEGAR FASES DO PROJETOS
        const ID_PROJECT_PHASES = project.project_phase.map(
          project2 => project2.dataValues.id_project_phase
        );

        // PEGAR TODOS OS PRODUTOS REFERENTE AS FASES DE PROJETO
        const products = await Product.findAll({
          where:
            ID_PROJECT_PHASES.length > 0
              ? {
                  id_project_phase: {
                    [Op.in]: ID_PROJECT_PHASES,
                  },
                }
              : {},
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
            [Op.and]: {
              id_product_history: {
                [Op.in]: values,
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

        const project_phase_details =
          sort.length > 0 &&
          (await Project_phase.findByPk(sort[0].id_project_phase));

        Data.push({
          nm_project: project.dataValues.nm_project,
          nm_city: project.dataValues.city.dataValues.nm_city,
          cd_priority: project.dataValues.cd_priority,
          cd_complexity: project.cd_complexity,
          nm_region: project.city.dataValues.region.dataValues.nm_region,
          cd_sei: project.dataValues.cd_sei || 'Não Possui',
          tx_description: project.dataValues.tx_description || 'Não Possui',
          phase_type_code:
            project_phase_details.tp_project_phase || 'Não Possui',
          phase_type_name: project_phase_details.tp_project_phase
            ? (project_phase_details.tp_project_phase === 10 && 'Concepção') ||
              (project_phase_details.tp_project_phase === 20 &&
                'Priorização') ||
              (project_phase_details.tp_project_phase === 30 &&
                'Desenvolvimento') ||
              (project_phase_details.tp_project_phase === 40 && 'Licitação') ||
              (project_phase_details.tp_project_phase === 50 && 'Execução') ||
              (project_phase_details.tp_project_phase === 60 &&
                'Encerrado em Garantia')
            : 'Não Possui',
          nm_project_phase:
            project_phase_details.nm_project_phase || 'Não Possui',
        });
      })
    );

    return {
      projects: Data,
    };
  }
}
