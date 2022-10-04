"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);











var _models = require('../../database/models');

 class GetProjectsCoordinatesService {
  async execute({ id_city, nm_project, id_category, tp_project_phase }) {
    const getLocation = await _models.Project.findAll({
      where: {
        [_sequelize.Op.and]: [
          {
            id_city: Number(id_city),
          },
          nm_project
            ? {
                nm_project: {
                  [_sequelize.Op.like]: `%${nm_project}%`,
                },
              }
            : {},
          id_category
            ? {
                id_category,
              }
            : {},
        ],
      },

      include: [
        {
          model: _models.Project_phase,
          as: 'project_phase',
        },
        {
          model: _models.City,
          as: 'city',
        },
        {
          model: _models.Category,
          as: 'category',
        },
      ],
    });

    const data = Promise.all(
      getLocation.map(async item => {
        const project = item.dataValues;
        const project_phase = project.project_phase;

        /// //////////////////////////////

        const getProject = await _models.Project.findOne({
          where: {
            id_project: project.id_project,
          },
          include: [
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
          ],
        });

        let actual_project_phase;

        if (getProject.dataValues.project_phase.length > 0) {
          /// SETAR OS ID DAS FASES DO PROJETO EM UM ARRAY
          const ID_PROJECT_PHASES = getProject.dataValues.project_phase.map(
            result => result.dataValues.id_project_phase
          );
          /// PEGAR OS PRODUTOS REFERENTES AS FASES
          const products = await _models.Product.findAll({
            where: {
              id_project_phase: {
                [_sequelize.Op.in]: ID_PROJECT_PHASES,
              },
            },
          });
          // SETAR OS ID DOS PRODUTOS EM UM ARRAY
          const ID_PRODUCTS = products.map(
            product => product.dataValues.id_product
          );
          // BUSCAR PELO STATUS ATUAL DE CADA PRODUTO
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
          // SETAR OS ID DO HISTORICO DE PRODUTO EM UM ARRAY
          const ID_PRODUCT_HISTORIES = findLastRecord.map(
            ({ id_product_history }) => id_product_history
          );
          const productHistories = await _models.Product_history.findAll({
            where: {
              [_sequelize.Op.and]: {
                id_product_history: {
                  [_sequelize.Op.in]: ID_PRODUCT_HISTORIES,
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
            actual_project_phase = await _models.Project_phase.findOne({
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

        const location = await _models.Location.findAll({
          where: {
            id_project: project.id_project,
          },
          include: [
            {
              model: _models.Polygon_area,
              as: 'polygon_area',
            },
          ],
        });

        const timelapse = await _models.Timelapse_Coordinates.findAll({
          where: {
            id_project_phase: {
              [_sequelize.Op.in]: getProjectPhaseIds,
            },
          },
        });

        const { id_project, nm_project: nmProject } = project;

        return {
          tp_project_phase:
            actual_project_phase &&
            actual_project_phase.dataValues.tp_project_phase,
          nm_project: nmProject,
          id_project,
          location,
          timelapse,
        };
      })
    );

    const filter = {
      ...(tp_project_phase && { tp_project_phase: Number(tp_project_phase) }),
    };

    const jejiejfe = await data;

    const kek = jejiejfe.filter(item => {
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
} exports.GetProjectsCoordinatesService = GetProjectsCoordinatesService;
