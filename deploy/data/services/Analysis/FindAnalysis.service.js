"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _datefns = require('date-fns');









var _models = require('../../database/models');

 class FindAnalysisService {
  async execute({
    page,
    limit,
    id_professional,
    id_project,
    id_project_phase,
    nm_product,
    id_allocation_period,
    on_production,
    in_correction,
    in_analisys,
    in_analisysCorretion,
    concluded,
  }) {
    if (
      !id_professional &&
      !id_project &&
      !id_project_phase &&
      !nm_product &&
      !id_allocation_period &&
      !on_production &&
      !in_correction &&
      !in_analisys &&
      !in_analisysCorretion &&
      !concluded
    ) {
      return { error: 'Informe pelo menos uma opção de filtro!' };
    }

    const havingValues = [
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
      order: [
        ['allocation', 'dt_start_allocation', 'ASC'],
        ['product', 'project_phase', 'project', 'nm_project', 'ASC'],
        ['product', 'project_phase', 'nu_order', 'ASC'],
        ['product', 'nu_order', 'ASC'],
      ],
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
          id_project_phase
            ? {
                ...(id_project_phase && {
                  '$product.project_phase.id_project_phase$': id_project_phase,
                }),
              }
            : null,
          id_project
            ? {
                ...(id_project && {
                  '$product.project_phase.project.id_project$': id_project,
                }),
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
          required: id_project || id_project_phase || nm_product,
          include: [
            {
              model: _models.Role,
              as: 'suggested_role',
            },
            {
              model: _models.Project_phase,
              as: 'project_phase',
              required: id_project || id_project_phase,

              include: [
                {
                  model: _models.Project,
                  as: 'project',
                  required: id_project,
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

    const getRows = await Promise.all(
      productHistories.rows.map(async product => {
        const getDocuments = await _models.Document.count({
          where: {
            id_product: product.id_product,
          },
        });

        return {
          id_product_history: product.id_product_history,
          tx_remark: product.tx_remark || 'Não possui',
          hasDocuments: getDocuments,
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
          delivery_from:
            ((product.cd_status === 2 || product.cd_status === 4) &&
              product['professional.nm_professional']) ||
            'Não Possui',
          delivery_at:
            ((product.cd_status === 2 || product.cd_status === 4) &&
              _datefns.format.call(void 0, new Date(product.dt_created_at), 'dd/MM/yyyy')) ||
            'Não possui',
          nm_file: product.nm_file,
          nm_original_file: product.nm_original_file,
          cd_status:
            (product.cd_status === 0 && 'Ag. Alocação') ||
            (product.cd_status === 1 && 'Em Produção') ||
            (product.cd_status === 2 && 'Em Análise') ||
            (product.cd_status === 3 && 'Em Correção') ||
            (product.cd_status === 4 && 'Em Análise de Correção') ||
            (product.cd_status === 5 && 'Concluído'),
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
        };
      })
    );

    return {
      analysis: {
        count: productHistories.count,
        rows: getRows,
      },
    };
  }
} exports.FindAnalysisService = FindAnalysisService;
