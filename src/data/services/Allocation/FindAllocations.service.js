import Sequelize, { Op } from 'sequelize';
import { format } from 'date-fns';
import {
  Product,
  Project_phase,
  Project,
  Product_history,
  Allocation_period,
  Professional,
  Role,
} from '../../database/models';
import { calculateHour } from '../../../utils/calculateHour';

export class FindAllocationsService {
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
    allProducts,
    id_city,
  }) {
    console.log({ id_city });

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

    const findLastRecord = await Product_history.findAll({
      attributes: [
        [
          Sequelize.fn('MAX', Sequelize.col('id_product_history')),
          'id_product_history',
        ],
      ],
      group: Sequelize.col('id_product'),
      raw: true,
    });

    const values = findLastRecord.map(
      ({ id_product_history }) => id_product_history
    );

    const productHistories = await Product_history.findAndCountAll({
      limit: limit !== 'all' ? Number(limit) : null,
      offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
      raw: true,
      where: {
        [Op.and]: [
          {
            '$product.project_phase.project.nm_deleted_by$': {
              [Op.is]: null,
            },
          },
          {
            id_product_history: {
              [Op.in]: values,
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
                  [Op.or]: havingValues.map(({ value }) => value),
                },
              }
            : {},
          nm_product
            ? {
                ...(nm_product && {
                  '$product.nm_product$': {
                    [Op.like]: `%${nm_product.trim()}%`,
                  },
                }),
              }
            : {},
          allProducts
            ? {
                [Op.or]: [
                  {
                    '$product.tp_required_action$': 1,
                  },
                  {
                    '$product.tp_required_action$': 2,
                  },
                ],
              }
            : {},
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
          cd_priority || id_project || id_city
            ? {
                ...(cd_priority && {
                  '$product.project_phase.project.cd_priority$': cd_priority,
                }),
                ...(id_project && {
                  '$product.project_phase.project.id_project$': id_project,
                }),
                '$product.project_phase.project.nm_deleted_by$': {
                  [Op.is]: null,
                },
                ...(id_city && {
                  '$product.project_phase.project.id_city$': id_city,
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
          model: Product,
          as: 'product',
          required: cd_priority || id_project || id_project_phase || nm_product,
          include: [
            {
              model: Role,
              required: id_suggested_role,
              as: 'suggested_role',
            },
            {
              model: Project_phase,
              as: 'project_phase',
              required: cd_priority || id_project || id_project_phase,
              include: [
                {
                  model: Project,
                  as: 'project',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          model: Professional,
          as: 'professional',

          attributes: ['nm_professional'],
          required: id_professional,
        },
        {
          model: Allocation_period,
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
      duration: calculateHour({
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
        period: `${format(
          new Date(product['allocation.dt_start_allocation']),
          'dd/MM/yyyy'
        )} - ${format(
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
}
