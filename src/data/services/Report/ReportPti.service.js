import Sequelize, { Op } from 'sequelize';
import {
  Allocation,
  Professional,
  Allocation_period,
  Product,
  Project_phase,
  Project,
  City,
  Product_history,
} from '../../database/models';

export class ReportPtiService {
  async execute({ page, limit, id_allocation_period }) {
    const professionals = await Professional.findAndCountAll({
      limit: limit !== 'all' ? Number(limit) : null,
      order: [['nm_professional', 'ASC']],
      offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,

      include: [
        {
          model: Allocation,
          as: 'allocation',
          where: id_allocation_period
            ? {
                [Op.and]: [
                  {
                    id_allocation_period,
                  },
                ],
              }
            : {},

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
                      include: [
                        {
                          model: City,
                          as: 'city',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              model: Allocation_period,

              as: 'allocation_period',
            },
          ],
        },
      ],
    });

    const getProfessionals = Promise.all(
      professionals.rows.map(professional => {
        const prof = professional.dataValues;

        const { allocation } = prof;

        return Promise.all(
          allocation.map(async alloc => {
            const {
              id_allocation_period: idAllocation_period,
              id_professional,
            } = alloc.dataValues;

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
              where: {
                [Op.and]: [
                  {
                    id_product_history: {
                      [Op.in]: values,
                    },
                  },
                  {
                    id_product: alloc.dataValues.product.dataValues.id_product,
                  },
                  {
                    id_allocation_period: idAllocation_period,
                  },
                  {
                    id_professional,
                  },
                ],
              },
              raw: true,
            });

            return {
              nm_project:
                alloc.dataValues.product.dataValues.project_phase.dataValues
                  .project.dataValues.nm_project,
              cd_sei:
                alloc.dataValues.product.dataValues.project_phase.dataValues
                  .project.dataValues.cd_sei || 'Não Possui',
              nm_professiona: prof.nm_professional,
              nm_city:
                alloc.dataValues.product.dataValues.project_phase.dataValues
                  .project.dataValues.city.dataValues.nm_city,
              nm_product: alloc.dataValues.product.dataValues.nm_product,
              tp_action_picture: alloc.dataValues.tp_action_picture,
              qt_hours_picture: alloc.dataValues.qt_hours_picture,
              cd_status:
                (productHistories[productHistories.length - 1].cd_status ===
                  0 &&
                  'Ag. Alocação') ||
                (productHistories[productHistories.length - 1].cd_status ===
                  1 &&
                  'Em Produção') ||
                (productHistories[productHistories.length - 1].cd_status ===
                  2 &&
                  'Em Análise') ||
                (productHistories[productHistories.length - 1].cd_status ===
                  3 &&
                  'Em Correção') ||
                (productHistories[productHistories.length - 1].cd_status ===
                  4 &&
                  'Em Análise de Correção') ||
                (productHistories[productHistories.length - 1].cd_status ===
                  5 &&
                  'Concluído'),
            };
          })
        );
      })
    );

    const professionalList = [];

    (await getProfessionals).map(profess =>
      profess.map(teste => professionalList.push(teste))
    );

    return {
      ptis: {
        count: professionals.count,
        rows: professionalList,
      },
    };
  }
}
