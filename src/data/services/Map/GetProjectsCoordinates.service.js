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
  Timelapse_Coordinates,
  Media_timelapse,
} from '../../database/models';

export class GetProjectsCoordinatesService {
  async execute({ nm_project, nm_city, id_category, tp_project_phase }) {
    const projects = await Project.findAndCountAll({
      attributes: [
        'id_project',
        'nm_project',
        'cd_sei',
        'cd_priority',
        'qt_m2',
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

    const Data = [];

    await Promise.all(
      projects.rows.map(async project => {
        const ID_PROJECT_PHASES = project.dataValues.project_phase.map(
          result => result.dataValues.id_project_phase
        );

        if (ID_PROJECT_PHASES.length === 0) {
          Data.push({
            id_project: project.dataValues.id_project,
            timelapse: [],
            location:
              project.dataValues.location.length > 0
                ? project.dataValues.location
                : '',
            polygon_area: project.dataValues.polygon_area,
          });
        } else {
          const products = await Product.findAll({
            where: {
              id_project_phase: {
                [Op.in]: ID_PROJECT_PHASES,
              },
            },
          });

          if (products.length > 0) {
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

            if (productHistories.length > 0) {
              const projectPhaseWithHistories = productHistories.map(
                ph => ph.dataValues.product.dataValues.id_project_phase
              );

              const reducedArray = projectPhaseWithHistories.reduce(
                (acc, curr) => {
                  if (acc.length === 0)
                    acc.push({ id_project_phase: curr, count: 1 });
                  else if (
                    acc.findIndex(f => f.id_project_phase === curr) === -1
                  )
                    acc.push({ id_project_phase: curr, count: 1 });
                  else
                    ++acc[acc.findIndex(f => f.id_project_phase === curr)]
                      .count;
                  return acc;
                },
                []
              );

              const sort = reducedArray.sort((a, b) => b.count - a.count);

              const project_phase = await Project_phase.findOne({
                where: {
                  id_project_phase: sort[0].id_project_phase,
                },
                include: [
                  {
                    model: Timelapse_Coordinates,
                    as: 'timelapse',
                    include: [
                      {
                        model: Media_timelapse,
                        as: 'media_timelapse',
                      },
                    ],
                  },
                ],
              });

              Data.push({
                id_project: project.dataValues.id_project,
                timelapse: project_phase.dataValues.timelapse,
                location:
                  project.dataValues.location.length > 0
                    ? project.dataValues.location
                    : '',
                polygon_area: project.dataValues.location.polygon_area,
              });
            } else {
              Data.push({
                id_project: project.dataValues.id_project,
                timelapse: [],
                location:
                  project.dataValues.location.length > 0
                    ? project.dataValues.location
                    : '',
                polygon_area: project.dataValues.location.polygon_area,
              });
            }
          } else {
            Data.push({
              id_project: project.dataValues.id_project,
              timelapse: [],
              location:
                project.dataValues.location.length > 0
                  ? project.dataValues.location
                  : '',
              polygon_area: project.dataValues.location.polygon_area,
            });
          }
        }
      })
    );

    const res = Data.filter(item => item.location);

    const filter = {
      ...(nm_project && { nm_project }),
      ...(nm_city && { nm_city }),
      ...(id_category && { id_category: Number(id_category) }),
      ...(tp_project_phase && { tp_project_phase: Number(tp_project_phase) }),
    };

    const kek = res.filter(item => {
      // eslint-disable-next-line no-restricted-syntax
      for (const key in filter) {
        if (!item[key]) return false;

        if (typeof item[key] === 'string') {
          if (
            item[key] === undefined ||
            (item[key] && !item[key].includes(filter[key]))
          )
            return false;
        }

        if (typeof item[key] === 'number') {
          if (item[key] === undefined || item[key] !== filter[key])
            return false;
        }
      }
      return true;
    });

    return {
      projects: kek,
    };
  }
}
