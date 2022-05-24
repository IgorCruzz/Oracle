import { Op } from 'sequelize';
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
    on_production,
    in_correction,
    in_analisys,
    in_analisysCorretion,
    concluded,
  }) {
    const productHistories = await Product.findAndCountAll({
      limit: limit !== 'all' ? Number(limit) : null,
      offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
      include: [
        {
          model: Allocation,
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
              as: 'allocation_period',
              where: id_allocation_period
                ? {
                    id_allocation_period,
                  }
                : {},
            },
            {
              model: Product,
              as: 'product',

              where: nm_product
                ? {
                    [Op.or]: [
                      { tp_required_action: 1 },
                      { tp_required_action: 2 },
                    ],
                    nm_product,
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
                  model: Product_history,
                  as: 'product_history',
                },
                {
                  model: Project_phase,
                  as: 'project_phase',

                  where: id_project_phase ? { id_project_phase } : {},
                  include: [
                    {
                      model: Project,
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
              as: 'professional',

              include: [
                {
                  model: User,
                  as: 'user',

                  attributes: [
                    'id_user',
                    'ds_email_login',
                    'nm_user',
                    'dt_created_at',
                    'dt_updated_at',
                    'tp_profile',
                    'in_active',
                  ],
                },
              ],
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
          required: true,
          as: 'product_history',
          where: {
            [Op.or]: [
              { cd_status: 0 },
              on_production && { cd_status: 1 },
              in_correction && { cd_status: 2 },
              in_analisys && { cd_status: 3 },
              in_analisysCorretion && { cd_status: 4 },
              concluded && { cd_status: 5 },
            ],
          },
        },
      ],
    });

    const getProducts = await productHistories.rows.map(value => {
      const teste = value.dataValues;

      console.log({
        Product: {
          id_product: teste.id_product,
          nu_order: teste.nu_order,
          nm_product: teste.nm_product,
          qt_minimum_hour: teste.qt_minimum_hour,
          qt_maximum_hours: teste.qt_maximum_hours,
          qt_probable_hours: teste.qt_probable_hours,
          tp_required_action: teste.tp_required_action,
          ds_note_required_action: teste.ds_note_required_action,
        },
      });
    });

    return {
      allocations: productHistories,
    };
  }
}
