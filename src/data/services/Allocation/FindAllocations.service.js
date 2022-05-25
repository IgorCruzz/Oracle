import { Op } from 'sequelize';
// import { format } from 'date-fns';
import {
  Product,
  Allocation,
  Project_phase,
  Project,
  Product_history,
  Allocation_period,
  Professional,
  User,
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
      limit: limit !== 'all' ? Number(limit) : null,
      offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
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
            {
              model: Role,
              as: 'role',
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
      const teste = value.dataValues;
      const project_phase = teste.project_phase.dataValues;
      const { project } = teste.project_phase.dataValues;
      const { product_history } = value.dataValues;

      return {
        Project: {
          id_project: project.id_project,
          nm_project: project.nm_project,
        },
        Project_phase: {
          id_project_phase: project_phase.id_project_phase,
          nm_project_phase: project_phase.nm_project_phase,
        },
        Product: {
          id_product: teste.id_product,
          nu_order: teste.nu_order,
          nm_product: teste.nm_product,
          qt_minimum_hour: teste.qt_minimum_hour,
          qt_maximum_hours: teste.qt_maximum_hours,
          qt_probable_hours: teste.qt_probable_hours,
          tp_required_action: teste.tp_required_action,
          ds_note_required_action: teste.ds_note_required_action,
          id_suggested_role: teste.id_suggested_role,
        },
        Status: {
          ...value.dataValues.product_history[
            value.dataValues.product_history.length - 1
          ].dataValues,
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
