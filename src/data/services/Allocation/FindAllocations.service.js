import { Op } from 'sequelize';
import {
  Product,
  Allocation,
  Project_phase,
  Project,
  Product_history,
  Allocation_period,
  Professional,
  Role,
  Grade,
  Sector,
} from '../../database/models';

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
    // on_production,
    // in_correction,
    // in_analisys,
    // in_analisysCorretion,
    // concluded,
  }) {
    const productCount = await Product.findAndCountAll({});
    const productHistories = await Product.findAndCountAll({
      where: nm_product
        ? {
            nm_product: {
              [Op.like]: `%${nm_product.trim()}%`,
            },
          }
        : null,
      limit: limit !== 'all' ? Number(limit) : null,
      offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
      include: [
        { model: Role, as: 'suggested_role' },
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
        {
          model: Allocation,
          required: false,
          as: 'allocation',
          where: {
            ...(id_professional && {
              id_professional,
            }),
            ...(id_suggested_role && { id_role_picture: id_suggested_role }),
          },
          include: [
            {
              model: Allocation_period,
              required: false,
              as: 'allocation_period',
              where: id_allocation_period
                ? {
                    id_allocation_period,
                  }
                : {},
            },
            {
              model: Product,
              required: false,
              as: 'product',
              include: [
                {
                  model: Product_history,
                  required: false,
                  as: 'product_history',
                },
                {
                  model: Project_phase,
                  required: false,
                  as: 'project_phase',

                  where: id_project_phase ? { id_project_phase } : {},
                  include: [
                    {
                      model: Project,
                      required: false,
                      as: 'project',

                      where:
                        cd_priority || id_project
                          ? {
                              [Op.and]: [
                                {
                                  dt_deleted_at: null,
                                  ...(cd_priority && { cd_priority }),
                                  ...(id_project && { id_project }),
                                },
                              ],
                            }
                          : {
                              dt_deleted_at: null,
                            },
                    },
                  ],
                },
              ],
            },
            {
              model: Professional,
              required: false,
              as: 'professional',
            },

            { model: Grade, as: 'grade' },
            { model: Sector, as: 'sector' },
          ],
        },
        {
          model: Product_history,
          as: 'product_history',
          include: [
            {
              model: Professional,

              as: 'professional',
            },
            {
              model: Allocation_period,

              as: 'allocation',
            },
          ],
        },
      ],
    });

    const getProducts = await productHistories.rows.map(value => {
      const product = value.dataValues;
      const project_phase = product.project_phase.dataValues;
      const { project } = product.project_phase.dataValues;
      const status =
        value.dataValues.product_history[
          value.dataValues.product_history.length - 1
        ].dataValues;

      return {
        project: {
          id_project: project.id_project,
          nm_project: project.nm_project,
        },
        project_phase: {
          id_project_phase: project_phase.id_project_phase,
          nm_project_phase: project_phase.nm_project_phase,
        },
        product: {
          id_product: product.id_product,
          nu_order: product.nu_order,
          nm_product: product.nm_product,
          qt_minimum_hour: product.qt_minimum_hour,
          qt_maximum_hours: product.qt_maximum_hours,
          qt_probable_hours: product.qt_probable_hours,
          tp_required_action: product.tp_required_action,
          ds_note_required_action: product.ds_note_required_action,
        },
        suggested_role: {
          id_role: product.suggested_role.id_role,
          nm_role: product.suggested_role.nm_role,
        },
        product_history: {
          id_product_history: status.id_product_history,
          cd_status: status.cd_status,
          dt_status: status.dt_status,
          tx_remark: status.tx_remark,
        },
        professional: {
          ...(status.professional
            ? {
                id_professional: status.professional.dataValues.id_professional,
                nm_professional: status.professional.dataValues.id_professional,
                in_delivery_analyst:
                  status.professional.dataValues.id_professional,
                in_active: status.professional.dataValues.id_professional,
              }
            : null),
        },
      };
    });

    return {
      allocations: {
        count: productCount.count,
        rows: { getProducts },
      },
    };
  }
}
