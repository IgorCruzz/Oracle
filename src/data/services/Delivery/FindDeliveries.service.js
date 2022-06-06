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

export class FindDeliveriesService {
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
      return { error: 'Selecione, pelo menos, uma opção de filtro.' };
    }

    const havingValues = [
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

    const productHistories = await Product_history.findAll({
      limit: limit !== 'all' ? Number(limit) : null,
      offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
      raw: true,
      where: {
        [Op.and]: [
          {
            id_product_history: {
              [Op.in]: values,
            },
          },
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
        ],
      },
      include: [
        {
          model: Product,
          as: 'product',
          required: id_project || id_project_phase || nm_product,
          where: nm_product
            ? {
                ...(nm_product && {
                  nm_product: { [Op.like]: `%${nm_product.trim()}%` },
                }),
              }
            : {
                [Op.or]: [
                  {
                    tp_required_action: 1,
                  },
                  {
                    tp_required_action: 2,
                  },
                ],
              },
          include: [
            {
              model: Role,
              as: 'suggested_role',
            },
            {
              model: Project_phase,
              as: 'project_phase',
              required: id_project || id_project_phase,
              where: id_project_phase
                ? {
                    ...(id_project_phase && { id_project_phase }),
                  }
                : null,
              include: [
                {
                  model: Project,
                  as: 'project',
                  required: id_project,
                  where: id_project
                    ? {
                        ...(id_project && { id_project }),
                      }
                    : null,
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
          where: id_professional
            ? {
                id_professional,
              }
            : null,
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
          where: id_allocation_period
            ? {
                id_allocation_period,
              }
            : null,
        },
      ],
    });

    const getRows = productHistories.map(product => ({
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
      cd_status:
        (product.cd_status === 0 && 'Não Alocado') ||
        (product.cd_status === 1 && 'Em Produção') ||
        (product.cd_status === 2 && 'Em Análise') ||
        (product.cd_status === 3 && 'Em Correção') ||
        (product.cd_status === 4 && 'Em Análise de Correção') ||
        (product.cd_status === 5 && 'Concluído'),
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
      deliveries: {
        count: getRows.length,
        rows: getRows,
      },
    };
  }
}
