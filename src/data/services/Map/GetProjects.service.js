import Sequelize, { Op } from 'sequelize';

import {
  Project,
  Project_phase,
  Product,
  Product_history,
  City,
  Region,
  Location,
} from '../../database/models';
import { calculateHour } from '../../../utils/calculateHour';

const formatValue = value =>
  value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export class GetProjectsService {
  async execute() {
    const projects = await Project.findAndCountAll({
      distinct: true,
      attributes: [
        'id_project',
        'nm_project',
        'cd_sei',
        'cd_priority',
        'qt_m2',
        'vl_estimated',
        'vl_bid',
        'vl_contract',
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
            nm_project: project.dataValues.nm_project,
            cd_sei: project.dataValues.cd_sei,
            nm_city: project.dataValues.city.nm_city,
            qt_m2: project.dataValues.qt_m2 || '',
            cd_priority:
              (project.dataValues.cd_priority === 1 && 'Baixa') ||
              (project.dataValues.cd_priority === 2 && 'Média') ||
              (project.dataValues.cd_priority === 3 && 'Alta'),
            value:
              (project.dataValues.vl_contract &&
                formatValue(project.dataValues.vl_contract)) ||
              (project.dataValues.vl_bid &&
                formatValue(project.dataValues.vl_bid)) ||
              (project.dataValues.vl_estimated &&
                formatValue(project.dataValues.vl_estimated)) ||
              '',
            project_phase: '',
            phaseCompletion: '',
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

              const project_phase = await Project_phase.findByPk(
                sort[0].id_project_phase
              );

              const getProductsFromProjectPhase =
                sort.length > 0 &&
                (await Product.findAll({
                  where: {
                    id_project_phase: sort[0].id_project_phase,
                  },
                }));

              const productsZ = getProductsFromProjectPhase.map(product => ({
                id_product: product.id_product,
                product_name: product.nm_product,
                duration: calculateHour({
                  max: product.qt_maximum_hours,
                  min: product.qt_minimum_hours,
                  prov: product.qt_probable_hours,
                  value: product.tp_required_action,
                }),
              }));

              const productSumDuration =
                productsZ.length > 0 &&
                productsZ.reduce((acc, curr) => {
                  return acc + curr.duration;
                }, 0);

              const productHistoriesConcluded = await Product_history.findAll({
                where: {
                  [Op.and]: {
                    id_product_history: {
                      [Op.in]: values,
                    },
                    cd_status: {
                      [Op.eq]: 5,
                    },
                  },
                },
                attributes: ['id_product'],
                include: [
                  {
                    model: Product,
                    as: 'product',
                  },
                ],
              });

              const productHistoriesConcluded2 = productHistoriesConcluded.map(
                productHistory => ({
                  id_product: productHistory.dataValues.product.id_product,
                  product_name: productHistory.dataValues.product.nm_product,
                  duration: calculateHour({
                    max: productHistory.dataValues.product.qt_maximum_hours,
                    min: productHistory.dataValues.product.qt_minimum_hours,
                    prov: productHistory.dataValues.product.qt_probable_hours,
                    value: productHistory.dataValues.product.tp_required_action,
                  }),
                })
              );

              const productHistoriesConcluded3 = productHistoriesConcluded2.reduce(
                (acc, curr) => {
                  return acc + curr.duration;
                },
                0
              );

              Data.push({
                nm_project: project.dataValues.nm_project,
                cd_sei: project.dataValues.cd_sei,
                nm_city: project.dataValues.city.nm_city,
                qt_m2: project.dataValues.qt_m2 || '',
                cd_priority:
                  (project.dataValues.cd_priority === 1 && 'Baixa') ||
                  (project.dataValues.cd_priority === 2 && 'Média') ||
                  (project.dataValues.cd_priority === 3 && 'Alta'),
                value:
                  (project.dataValues.vl_contract &&
                    formatValue(project.dataValues.vl_contract)) ||
                  (project.dataValues.vl_bid &&
                    formatValue(project.dataValues.vl_bid)) ||
                  (project.dataValues.vl_estimated &&
                    formatValue(project.dataValues.vl_estimated)) ||
                  '',
                project_phase: project_phase.dataValues.nm_project_phase,
                phaseCompletion: `${(
                  (productHistoriesConcluded3 / productSumDuration) *
                  100
                ).toFixed(2)}%`,
                location:
                  project.dataValues.location.length > 0
                    ? project.dataValues.location[0]
                    : '',
              });
            } else {
              Data.push({
                nm_project: project.dataValues.nm_project,
                cd_sei: project.dataValues.cd_sei,
                nm_city: project.dataValues.city.nm_city,
                qt_m2: project.dataValues.qt_m2 || '',
                cd_priority:
                  (project.dataValues.cd_priority === 1 && 'Baixa') ||
                  (project.dataValues.cd_priority === 2 && 'Média') ||
                  (project.dataValues.cd_priority === 3 && 'Alta'),
                value:
                  (project.dataValues.vl_contract &&
                    formatValue(project.dataValues.vl_contract)) ||
                  (project.dataValues.vl_bid &&
                    formatValue(project.dataValues.vl_bid)) ||
                  (project.dataValues.vl_estimated &&
                    formatValue(project.dataValues.vl_estimated)) ||
                  '',
                project_phase: '',
                phaseCompletion: '',
                location:
                  project.dataValues.location.length > 0
                    ? project.dataValues.location[0]
                    : '',
              });
            }
          } else {
            Data.push({
              nm_project: project.dataValues.nm_project,
              cd_sei: project.dataValues.cd_sei,
              nm_city: project.dataValues.city.nm_city,
              qt_m2: project.dataValues.qt_m2 || '',
              cd_priority:
                (project.dataValues.cd_priority === 1 && 'Baixa') ||
                (project.dataValues.cd_priority === 2 && 'Média') ||
                (project.dataValues.cd_priority === 3 && 'Alta'),
              value:
                (project.dataValues.vl_contract &&
                  formatValue(project.dataValues.vl_contract)) ||
                (project.dataValues.vl_bid &&
                  formatValue(project.dataValues.vl_bid)) ||
                (project.dataValues.vl_estimated &&
                  formatValue(project.dataValues.vl_estimated)) ||
                '',
              project_phase: '',
              phaseCompletion: '',
              location:
                project.dataValues.location.length > 0
                  ? project.dataValues.location[0]
                  : '',
            });
          }
        }
      })
    );

    const res = Data.filter(item => item.location);

    return {
      projects: res,
    };
  }
}
