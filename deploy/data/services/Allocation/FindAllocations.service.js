"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _datefns = require('date-fns');








var _models = require('../../database/models');
var _calculateHour = require('../../../utils/calculateHour');

 class FindAllocationsService {
  async execute({
    page,
    limit,
    cd_priority,
    id_project,
    id_project_phase,
    nm_product,
    id_suggested_role,
    id_professional,
    id_allocation_period,
    wt_alocation,
    on_production,
    in_correction,
    in_analisys,
    in_analisysCorretion,
    concluded,
  }) {
    // if (
    //   !cd_priority &&
    //   !id_project &&
    //   !id_project_phase &&
    //   !nm_product &&
    //   !id_suggested_role &&
    //   !id_professional &&
    //   !id_allocation_period &&
    //   !wt_alocation &&
    //   !on_production &&
    //   !in_correction &&
    //   !in_analisys &&
    //   !in_analisysCorretion &&
    //   !concluded
    // ) {
    //   return { error: 'Selecione, pelo menos, uma opção de filtro.' };
    // }

    const havingValues = [
      wt_alocation && { value: 0 },
      on_production && { value: 1 },
      in_analisys && { value: 2 },
      in_correction && { value: 3 },
      in_analisysCorretion && { value: 4 },
      concluded && { value: 5 },
    ].filter(value => value);

    const findLastRecord = await _models.Product_history.findAll({
      attributes: [
        [
          _sequelize2.default.fn('MAX', _sequelize2.default.col('id_product_history')),
          'id_product_history',
        ],
      ],
      group: _sequelize2.default.col('id_product'),
      raw: true,
    });

    const values = findLastRecord.map(
      ({ id_product_history }) => id_product_history
    );

    const productHistories = await _models.Product_history.findAndCountAll({
      limit: limit !== 'all' ? Number(limit) : null,
      offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
      raw: true,
      where: {
        [_sequelize.Op.and]: [
          {
            '$product.project_phase.project.nm_deleted_by$': {
              [_sequelize.Op.is]: null,
            },
          },
          {
            id_product_history: {
              [_sequelize.Op.in]: values,
            },
          },
          wt_alocation ||
          on_production ||
          in_correction ||
          in_analisys ||
          in_analisysCorretion ||
          concluded
            ? {
                cd_status: {
                  [_sequelize.Op.or]: havingValues.map(({ value }) => value),
                },
              }
            : {},
          nm_product
            ? {
                ...(nm_product && {
                  '$product.nm_product$': {
                    [_sequelize.Op.like]: `%${nm_product.trim()}%`,
                  },
                }),
              }
            : {
                [_sequelize.Op.or]: [
                  {
                    '$product.tp_required_action$': 1,
                  },
                  {
                    '$product.tp_required_action$': 2,
                  },
                ],
              },
          id_suggested_role
            ? {
                ...(id_suggested_role && {
                  '$product.suggested_role.id_role$': id_suggested_role,
                }),
              }
            : null,
          id_project_phase
            ? {
                ...(id_project_phase && {
                  '$product.project_phase.id_project_phase$': id_project_phase,
                }),
              }
            : null,
          cd_priority || id_project
            ? {
                ...(cd_priority && {
                  '$product.project_phase.project.cd_priority$': cd_priority,
                }),
                ...(id_project && {
                  '$product.project_phase.project.id_project$': id_project,
                }),
                '$product.project_phase.project.nm_deleted_by$': {
                  [_sequelize.Op.is]: null,
                },
              }
            : null,
          id_professional
            ? {
                '$professional.id_professional$': id_professional,
              }
            : null,
          id_allocation_period
            ? {
                '$allocation.id_allocation_period$': id_allocation_period,
              }
            : null,
        ],
      },
      include: [
        {
          model: _models.Product,
          as: 'product',
          required: cd_priority || id_project || id_project_phase || nm_product,
          include: [
            {
              model: _models.Role,
              required: id_suggested_role,
              as: 'suggested_role',
            },
            {
              model: _models.Project_phase,
              as: 'project_phase',
              required: cd_priority || id_project || id_project_phase,
              include: [
                {
                  model: _models.Project,
                  as: 'project',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          model: _models.Professional,
          as: 'professional',

          attributes: ['nm_professional'],
          required: id_professional,
        },
        {
          model: _models.Allocation_period,
          as: 'allocation',
          required: id_allocation_period,
          attributes: [
            'dt_start_allocation',
            'dt_end_allocation',
            'qt_business_hours',
          ],
        },
      ],
    });

    const getRows = productHistories.rows.map(product => ({
      duration: _calculateHour.calculateHour.call(void 0, {
        max: product['product.qt_maximum_hours'],
        min: product['product.qt_minimum_hours'],
        prov: product['product.qt_probable_hours'],
        value: product['product.tp_required_action'],
      }),
      id_product_history: product.id_product_history,
      project: {
        id_project: product['product.project_phase.project.id_project'],
        nm_project: product['product.project_phase.project.nm_project'],
      },
      project_phase: {
        id_project_phase: product['product.project_phase.id_project_phase'],
        nm_project_phase: product['product.project_phase.nm_project_phase'],
      },
      product: {
        id_product: product['product.id_product'],
        nm_product: product['product.nm_product'],
      },
      tp_required_action:
        (product['product.tp_required_action'] === 1 && 'Produção Integral') ||
        (product['product.tp_required_action'] === 2 && 'Produção Parcial'),
      cd_status:
        (product.cd_status === 0 && 'Ag. Alocação') ||
        (product.cd_status === 1 && 'Em Produção') ||
        (product.cd_status === 2 && 'Em Análise') ||
        (product.cd_status === 3 && 'Em Correção') ||
        (product.cd_status === 4 && 'Em Análise de Correção') ||
        (product.cd_status === 5 && 'Concluído'),
      suggested_role: {
        id_role: product['product.suggested_role.id_role'],
        nm_role: product['product.suggested_role.nm_role'],
      },
      professional: product.id_professional && {
        id_professional: product.id_professional,
        nm_professional: product['professional.nm_professional'],
      },
      allocation_period: product.id_allocation_period && {
        id_allocation_period: product.id_allocation_period,
        period: `${_datefns.format.call(void 0, 
          new Date(product['allocation.dt_start_allocation']),
          'dd/MM/yyyy'
        )} - ${_datefns.format.call(void 0, 
          new Date(product['allocation.dt_end_allocation']),
          'dd/MM/yyyy'
        )} (${product['allocation.qt_business_hours']}h)`,
      },
    }));

    return {
      allocations: {
        count: productHistories.count,
        rows: getRows,
      },
    };
  }
} exports.FindAllocationsService = FindAllocationsService;
