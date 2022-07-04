import Sequelize, { Op } from 'sequelize';
import { format, parseISO, differenceInDays } from 'date-fns';
import {
  Product_history,
  Allocation_period,
  Product,
  Project_phase,
  Project,
} from '../../database/models';
import { calculateHour } from '../../../utils/calculateHour';

export class ReportProfessionalService {
  async execute({ page, limit, id_professional }) {
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
          {
            id_professional,
          },
        ],
      },
      include: [
        {
          model: Product,
          as: 'product',
          include: [
            {
              model: Project_phase,
              as: 'project_phase',
              include: [
                {
                  model: Project,
                  as: 'project',
                },
              ],
            },
          ],
        },
        {
          model: Allocation_period,
          as: 'allocation',
          attributes: [
            'dt_start_allocation',
            'dt_end_allocation',
            'qt_business_hours',
          ],
        },
      ],
    });

    const response = Promise.all(
      productHistories.map(async productHistory => {
        const testeee = await Product_history.findAll({
          raw: true,
          where: {
            [Op.and]: [
              {
                id_product: productHistory['product.id_product'],
              },
              {
                id_allocation_period: productHistory.id_allocation_period,
              },
              {
                [Op.or]: [
                  {
                    cd_status: 4,
                  },
                  {
                    cd_status: 2,
                  },
                ],
              },
            ],
          },
        });

        const corretion = await Product_history.findAll({
          raw: true,
          where: {
            [Op.and]: [
              {
                id_product: productHistory['product.id_product'],
              },
              {
                id_allocation_period: productHistory.id_allocation_period,
              },
              {
                cd_status: 3,
              },
            ],
          },
        });

        const status = await Product_history.findOne({
          raw: true,
          where: {
            [Op.and]: [
              {
                id_product_history: {
                  [Op.in]: values,
                },
              },
              {
                id_product: productHistory['product.id_product'],
              },
              {
                id_allocation_period: productHistory.id_allocation_period,
              },
            ],
          },
        });

        return {
          allocation_period: `${format(
            new Date(productHistory['allocation.dt_start_allocation']),
            'dd/MM/yyyy'
          )} - ${format(
            new Date(productHistory['allocation.dt_end_allocation']),
            'dd/MM/yyyy'
          )} (${productHistory['allocation.qt_business_hours']}h)`,
          nm_project:
            productHistory['product.project_phase.project.nm_project'],
          nm_product: productHistory['product.nm_product'],
          hour: calculateHour({
            max: productHistory['product.qt_maximum_hours'],
            min: productHistory['product.qt_minimum_hours'],
            prov: productHistory['product.qt_probable_hours'],
            value: productHistory['product.tp_required_action'],
          }),
          tp_required_action:
            (productHistory['product.tp_required_action'] === 0 &&
              'Não Definida') ||
            (productHistory['product.tp_required_action'] === 1 &&
              'Produção Integral') ||
            (productHistory['product.tp_required_action'] === 2 &&
              'Produção Parcial') ||
            (productHistory['product.tp_required_action'] === 3 &&
              'Dispensado') ||
            (productHistory['product.tp_required_action'] === 4 &&
              'Concluído pelo demandante'),
          delivery_forecast: format(
            new Date(productHistory['allocation.dt_end_allocation']),
            'dd/MM/yyyy'
          ),
          last_delivery:
            testeee.length > 0
              ? format(
                  parseISO(testeee[testeee.length - 1].dt_status),
                  'dd/MM/yyyy'
                )
              : 'Não Possui',
          delay:
            testeee.length > 0
              ? differenceInDays(
                  parseISO(testeee[testeee.length - 1].dt_status),
                  new Date(productHistory['allocation.dt_end_allocation'])
                ) > 0 &&
                `Sim: ${differenceInDays(
                  parseISO(testeee[testeee.length - 1].dt_status),
                  new Date(productHistory['allocation.dt_end_allocation'])
                )} dias`
              : 'Não Possui',
          correction_needed: corretion.length > 0 ? 'Sim' : 'Não',
          cd_status:
            (status.cd_status === 0 && 'Ag. Alocação') ||
            (status.cd_status === 1 && 'Em Produção') ||
            (status.cd_status === 2 && 'Em Análise') ||
            (status.cd_status === 3 && 'Em Correção') ||
            (status.cd_status === 4 && 'Em Análise de Correção') ||
            (status.cd_status === 5 && 'Concluído'),
        };
      })
    );

    return {
      projects: {
        count: 'Data.length',
        rows: await response,
      },
    };
  }
}
