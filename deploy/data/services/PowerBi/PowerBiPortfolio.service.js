"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);









var _models = require('../../database/models');
var _calculateHour = require('../../../utils/calculateHour');

 class PowerBiPortfolioService {
  async execute() {
    const projects = await _models.Project.findAndCountAll({
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
      ],
      include: [
        {
          model: _models.Category,
          as: 'category',
        },
        {
          model: _models.City,
          as: 'city',
          attributes: ['nm_city'],
          include: [
            {
              model: _models.Region,
              as: 'region',
              attributes: ['nm_region'],
            },
          ],
        },
        {
          model: _models.Project_phase,
          as: 'project_phase',
          attributes: ['id_project_phase', 'nu_order', 'nm_project_phase'],
          include: [
            {
              model: _models.Product,
              as: 'product',
            },
          ],
        },
        {
          model: _models.Location,
          as: 'location',
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
            nm_city: project.dataValues.city.nm_city,
            cd_priority:
              (project.dataValues.cd_priority === 1 && 'Baixa') ||
              (project.dataValues.cd_priority === 2 && 'Média') ||
              (project.dataValues.cd_priority === 3 && 'Alta'),
            qt_m2: project.dataValues.qt_m2 || '',
            nm_category: project.dataValues.category.nm_category,
            cd_complexity:
              (project.dataValues.cd_complexity === 1 && 'Baixa') ||
              (project.dataValues.cd_complexity === 2 && 'Média') ||
              (project.dataValues.cd_complexity === 3 && 'Alta'),
            nm_region: project.dataValues.city.dataValues.region.nm_region,
            cd_sei: project.dataValues.cd_sei || '',
            project_value:
              project.dataValues.vl_contract ||
              project.dataValues.vl_bid ||
              project.dataValues.vl_estimated ||
              '',
            tx_description: project.dataValues.tx_description || '',
            vl_estimated: project.dataValues.vl_estimated || '',
            vl_bid: project.dataValues.vl_bid || '',
            vl_contract: project.dataValues.vl_contract || '',
            tp_project_phase_code: '',
            tp_project_phase: '',
            nm_project_phase: '',
            phaseCompletion: '',
            ds_district:
              project.dataValues.location.length > 0
                ? project.dataValues.location[0].ds_district
                : '',
            ds_address:
              project.dataValues.location.length > 0
                ? project.dataValues.location[0].ds_address
                : '',
            nu_latitude:
              project.dataValues.location.length > 0
                ? project.dataValues.location[0].nu_latitude
                : '',
            nu_longitude:
              project.dataValues.location.length > 0
                ? project.dataValues.location[0].nu_longitude
                : '',
          });
        } else {
          const products = await _models.Product.findAll({
            where: {
              id_project_phase: {
                [_sequelize.Op.in]: ID_PROJECT_PHASES,
              },
            },
          });

          if (products.length > 0) {
            const ID_PRODUCTS = products.map(
              product => product.dataValues.id_product
            );

            const findLastRecord = await _models.Product_history.findAll({
              attributes: [
                [
                  _sequelize2.default.fn('MAX', _sequelize2.default.col('id_product_history')),
                  'id_product_history',
                ],
              ],
              group: _sequelize2.default.col('id_product'),
              raw: true,
              having: {
                id_product: {
                  [_sequelize.Op.in]: ID_PRODUCTS,
                },
              },
            });

            const values = findLastRecord.map(
              ({ id_product_history }) => id_product_history
            );

            const productHistories = await _models.Product_history.findAll({
              where: {
                [_sequelize.Op.and]: {
                  id_product_history: {
                    [_sequelize.Op.in]: values,
                  },
                  cd_status: {
                    [_sequelize.Op.gt]: 0,
                  },
                },
              },
              include: [
                {
                  model: _models.Product,
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

              const project_phase = await _models.Project_phase.findByPk(
                sort[0].id_project_phase
              );

              const getProductsFromProjectPhase =
                sort.length > 0 &&
                (await _models.Product.findAll({
                  where: {
                    id_project_phase: sort[0].id_project_phase,
                  },
                }));

              const productsZ = getProductsFromProjectPhase.map(product => ({
                id_product: product.id_product,
                product_name: product.nm_product,
                duration: _calculateHour.calculateHour.call(void 0, {
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

              const productHistoriesConcluded = await _models.Product_history.findAll({
                where: {
                  [_sequelize.Op.and]: {
                    id_product_history: {
                      [_sequelize.Op.in]: values,
                    },
                    cd_status: {
                      [_sequelize.Op.eq]: 5,
                    },
                  },
                },
                attributes: ['id_product'],
                include: [
                  {
                    model: _models.Product,
                    as: 'product',
                  },
                ],
              });

              const productHistoriesConcluded2 = productHistoriesConcluded.map(
                productHistory => ({
                  id_product: productHistory.dataValues.product.id_product,
                  product_name: productHistory.dataValues.product.nm_product,
                  duration: _calculateHour.calculateHour.call(void 0, {
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
                nm_city: project.dataValues.city.nm_city,
                cd_priority:
                  (project.dataValues.cd_priority === 1 && 'Baixa') ||
                  (project.dataValues.cd_priority === 2 && 'Média') ||
                  (project.dataValues.cd_priority === 3 && 'Alta'),
                qt_m2: project.dataValues.qt_m2 || '',
                nm_category: project.dataValues.category.nm_category,
                cd_complexity:
                  (project.dataValues.cd_complexity === 1 && 'Baixa') ||
                  (project.dataValues.cd_complexity === 2 && 'Média') ||
                  (project.dataValues.cd_complexity === 3 && 'Alta'),

                nm_region: project.dataValues.city.dataValues.region.nm_region,
                cd_sei: project.dataValues.cd_sei || '',
                project_value:
                  project.dataValues.vl_contract ||
                  project.dataValues.vl_bid ||
                  project.dataValues.vl_estimated ||
                  '',
                tx_description: project.dataValues.tx_description || '',
                vl_estimated: project.dataValues.vl_estimated || '',
                vl_bid: project.dataValues.vl_bid || '',
                vl_contract: project.dataValues.vl_contract || '',
                tp_project_phase_code:
                  project_phase.dataValues.tp_project_phase,
                tp_project_phase:
                  (project_phase.dataValues.tp_project_phase === 10 &&
                    'Concepção') ||
                  (project_phase.dataValues.tp_project_phase === 20 &&
                    'Priorização') ||
                  (project_phase.dataValues.tp_project_phase === 30 &&
                    'Desenvolvimento') ||
                  (project_phase.dataValues.tp_project_phase === 40 &&
                    'Licitação') ||
                  (project_phase.dataValues.tp_project_phase === 50 &&
                    'Execução') ||
                  (project_phase.dataValues.tp_project_phase === 60 &&
                    'Encerrado em Garantia'),
                nm_project_phase: project_phase.dataValues.nm_project_phase,
                phaseCompletion: `${(
                  (productHistoriesConcluded3 / productSumDuration) *
                  100
                ).toFixed(2)}%`,
                ds_district:
                  project.dataValues.location.length > 0
                    ? project.dataValues.location[0].ds_district
                    : '',
                ds_address:
                  project.dataValues.location.length > 0
                    ? project.dataValues.location[0].ds_address
                    : '',
                nu_latitude:
                  project.dataValues.location.length > 0
                    ? project.dataValues.location[0].nu_latitude
                    : '',
                nu_longitude:
                  project.dataValues.location.length > 0
                    ? project.dataValues.location[0].nu_longitude
                    : '',
              });
            } else {
              Data.push({
                nm_project: project.dataValues.nm_project,
                nm_city: project.dataValues.city.nm_city,
                cd_priority:
                  (project.dataValues.cd_priority === 1 && 'Baixa') ||
                  (project.dataValues.cd_priority === 2 && 'Média') ||
                  (project.dataValues.cd_priority === 3 && 'Alta'),
                qt_m2: project.dataValues.qt_m2 || '',
                nm_category: project.dataValues.category.nm_category,
                cd_complexity:
                  (project.dataValues.cd_complexity === 1 && 'Baixa') ||
                  (project.dataValues.cd_complexity === 2 && 'Média') ||
                  (project.dataValues.cd_complexity === 3 && 'Alta'),
                nm_region: project.dataValues.city.dataValues.region.nm_region,
                cd_sei: project.dataValues.cd_sei || '',
                project_value:
                  project.dataValues.vl_contract ||
                  project.dataValues.vl_bid ||
                  project.dataValues.vl_estimated ||
                  '',
                tx_description: project.dataValues.tx_description || '',
                vl_estimated: project.dataValues.vl_estimated || '',
                vl_bid: project.dataValues.vl_bid || '',
                vl_contract: project.dataValues.vl_contract || '',
                tp_project_phase_code: '',
                tp_project_phase: '',
                nm_project_phase: '',
                phaseCompletion: '',
                ds_district:
                  project.dataValues.location.length > 0
                    ? project.dataValues.location[0].ds_district
                    : '',
                ds_address:
                  project.dataValues.location.length > 0
                    ? project.dataValues.location[0].ds_address
                    : '',
                nu_latitude:
                  project.dataValues.location.length > 0
                    ? project.dataValues.location[0].nu_latitude
                    : '',
                nu_longitude:
                  project.dataValues.location.length > 0
                    ? project.dataValues.location[0].nu_longitude
                    : '',
              });
            }
          } else {
            Data.push({
              nm_project: project.dataValues.nm_project,
              nm_city: project.dataValues.city.nm_city,
              cd_priority:
                (project.dataValues.cd_priority === 1 && 'Baixa') ||
                (project.dataValues.cd_priority === 2 && 'Média') ||
                (project.dataValues.cd_priority === 3 && 'Alta'),
              qt_m2: project.dataValues.qt_m2 || '',
              nm_category: project.dataValues.category.nm_category,
              cd_complexity:
                (project.dataValues.cd_complexity === 1 && 'Baixa') ||
                (project.dataValues.cd_complexity === 2 && 'Média') ||
                (project.dataValues.cd_complexity === 3 && 'Alta'),
              nm_region: project.dataValues.city.dataValues.region.nm_region,
              cd_sei: project.dataValues.cd_sei || '',
              project_value:
                project.dataValues.vl_contract ||
                project.dataValues.vl_bid ||
                project.dataValues.vl_estimated ||
                '',
              tx_description: project.dataValues.tx_description || '',
              vl_estimated: project.dataValues.vl_estimated || '',
              vl_bid: project.dataValues.vl_bid || '',
              vl_contract: project.dataValues.vl_contract || '',
              tp_project_phase_code: '',
              tp_project_phase: '',
              nm_project_phase: '',
              phaseCompletion: '',
              ds_district:
                project.dataValues.location.length > 0
                  ? project.dataValues.location[0].ds_district
                  : '',
              ds_address:
                project.dataValues.location.length > 0
                  ? project.dataValues.location[0].ds_address
                  : '',
              nu_latitude:
                project.dataValues.location.length > 0
                  ? project.dataValues.location[0].nu_latitude
                  : '',
              nu_longitude:
                project.dataValues.location.length > 0
                  ? project.dataValues.location[0].nu_longitude
                  : '',
            });
          }
        }
      })
    );

    return {
      projects: Data,
    };
  }
} exports.PowerBiPortfolioService = PowerBiPortfolioService;
