import Sequelize, { Op } from 'sequelize';

import {
  Project,
  Project_phase,
  Location,
  Polygon_area,
  Timelapse_Coordinates,
  City,
  Category,
  Product,
  Product_history,
} from '../../database/models';

export class GetProjectsCoordinatesService {
  async execute({ id_city, nm_project, id_category, tp_project_phase }) {
    const getLocation = await Project.findAll({
      where: {
        [Op.and]: [
          {
            id_city: Number(id_city),
          },
          nm_project
            ? {
                nm_project: {
                  [Op.like]: `%${nm_project}%`,
                },
              }
            : {},
          id_category
            ? {
                id_category,
              }
            : {},
          tp_project_phase
            ? {
                '$project_phase.tp_project_phase$': tp_project_phase,
              }
            : {},
        ],
      },

      include: [
        {
          model: Project_phase,
          as: 'project_phase',
        },
        {
          model: City,
          as: 'city',
        },
        {
          model: Category,
          as: 'category',
        },
      ],
    });

    const data = Promise.all(
      getLocation.map(async item => {
        const project = item.dataValues;
        const project_phase = project.project_phase;

        /// //////////////////////////////

        const getProject = await Project.findOne({
          where: {
            id_project: project.id_project,
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

        let actual_project_phase;

        if (getProject.dataValues.project_phase.length > 0) {
          /// SETAR OS ID DAS FASES DO PROJETO EM UM ARRAY
          const ID_PROJECT_PHASES = getProject.dataValues.project_phase.map(
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
            if (acc.length === 0)
              acc.push({ id_project_phase: curr, count: 1 });
            else if (acc.findIndex(f => f.id_project_phase === curr) === -1)
              acc.push({ id_project_phase: curr, count: 1 });
            else ++acc[acc.findIndex(f => f.id_project_phase === curr)].count;
            return acc;
          }, []);
          const sort = reducedArray.sort((a, b) => b.count - a.count);

          if (sort.length > 0) {
            actual_project_phase = await Project_phase.findOne({
              where: {
                id_project_phase: sort[0].id_project_phase,
              },
            });
          } else {
            actual_project_phase = false;
          }
        } else {
          actual_project_phase = false;
        }

        /// /////////////////////
        const getProjectPhaseIds = project_phase.map(
          projectPhase => projectPhase.dataValues.id_project_phase
        );

        const location = await Location.findAll({
          where: {
            id_project: project.id_project,
          },
          include: [
            {
              model: Polygon_area,
              as: 'polygon_area',
            },
          ],
        });

        const timelapse = await Timelapse_Coordinates.findAll({
          where: {
            id_project_phase: {
              [Op.in]: getProjectPhaseIds,
            },
          },
        });

        const { id_project, nm_project: nmProject } = project;

        return {
          nm_project: nmProject,
          id_project,
          location,
          timelapse,
          actual_project_phase:
            actual_project_phase &&
            actual_project_phase.dataValues.tp_project_phase,
        };
      })
    );

    return {
      projects: await data,
    };
  }
}
