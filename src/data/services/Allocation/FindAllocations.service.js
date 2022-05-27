import { Op } from 'sequelize';
import { format } from 'date-fns';
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
    // on_production,
    // in_correction,
    // in_analisys,
    // in_analisysCorretion,
    // concluded,
  }) {
    // const productCount = await Product.findAndCountAll({});

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
        {
          model: Role,
          as: 'suggested_role',
          where: id_suggested_role ? { id_role: id_suggested_role } : {},
        },
        {
          model: Project_phase,
          as: 'project_phase',
          where: id_project_phase ? { id_project_phase } : {},
          include: [
            {
              model: Project,
              as: 'project',
              where: {
                ...(cd_priority && { cd_priority }),
                ...(id_project && { id_project }),
              },
            },
          ],
        },
        {
          model: Allocation,
          as: 'allocation',
          required: false,
          include: [
            {
              model: Allocation_period,
              required: false,
              as: 'allocation_period',
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
                  order: [['dt_created_at', 'DESC']],
                },
                {
                  model: Project_phase,
                  as: 'project_phase',
                  required: false,
                  include: [
                    {
                      model: Project,
                      required: false,
                      as: 'project',

                      where: {
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
            },

            { model: Grade, as: 'grade' },
            { model: Sector, as: 'sector' },
          ],
        },
        {
          model: Product_history,
          as: 'product_history',
          order: [['dt_created_at', 'DESC']],

          include: [
            {
              model: Professional,
              required: !!id_professional,
              where: id_professional ? { id_professional } : {},

              as: 'professional',
            },
            {
              model: Allocation_period,
              required: !!id_allocation_period,
              where: id_allocation_period ? { id_allocation_period } : {},
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
      const status = value.dataValues.product_history[0].dataValues;

      return {
        allocation:
          product.allocation.length > 0
            ? {
                id_allocation: product.allocation[0].dataValues.id_allocation,
              }
            : null,
        qt_hours_picture: calculateHour({
          max: product.qt_maximum_hours,
          min: product.qt_minimum_hours,
          prov: product.qt_probable_hours,
          value: product.tp_required_action,
        }),
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
          qt_minimum_hour: product.qt_minimum_hours,
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
                nm_professional: status.professional.dataValues.nm_professional,
                in_delivery_analyst:
                  status.professional.dataValues.in_delivery_analyst,
                in_active: status.professional.dataValues.in_active,
              }
            : null),
        },
        allocation_period: status.allocation
          ? {
              id_allocation_period:
                status.allocation.dataValues.id_allocation_period,
              allocation_period: `${format(
                status.allocation.dataValues.dt_start_allocation,
                'dd/MM/yyyy'
              )} - ${format(
                status.allocation.dataValues.dt_end_allocation,
                'dd/MM/yyyy'
              )} (${status.allocation.dataValues.qt_business_hours}h)`,
            }
          : null,
      };
    });

    // const get = await Product_history.findAndCountAll({
    //   attributes: ['id_product_history', 'cd_status'],
    //   include: [
    //     {
    //       model: Allocation_period,
    //       as: 'allocation',
    //       attributes: [
    //         'dt_start_allocation',
    //         'dt_end_allocation',
    //         'id_allocation_period',
    //         'qt_business_hours',
    //       ],
    //       required: !!id_allocation_period,
    //       where: { ...(id_allocation_period && { id_allocation_period }) },
    //     },
    //     {
    //       model: Professional,
    //       as: 'professional',
    //       attributes: ['id_professional', 'nm_professional'],
    //       required: !!id_professional,
    //       where: { ...(id_professional && { id_professional }) },
    //     },
    //     {
    //       model: Product,
    //       as: 'product',
    //       required: !!(
    //         cd_priority ||
    //         id_project ||
    //         id_project_phase ||
    //         nm_product ||
    //         id_suggested_role
    //       ),
    //       attributes: [
    //         'id_product',
    //         'nu_order',
    //         'nm_product',
    //         'qt_minimum_hours',
    //         'qt_maximum_hours',
    //         'qt_probable_hours',
    //         'tp_required_action',
    //       ],
    //       where: { ...(nm_product && { nm_product }) },
    //       include: [
    //         {
    //           model: Role,
    //           as: 'suggested_role',
    //           required: !!id_suggested_role,
    //           attributes: ['id_role', 'nm_role'],
    //           where: {
    //             ...(id_suggested_role && { id_role: id_suggested_role }),
    //           },
    //         },
    //         {
    //           model: Project_phase,
    //           as: 'project_phase',
    //           attributes: ['nm_project_phase', 'id_project_phase'],
    //           required: !!(cd_priority || id_project || id_project_phase),
    //           where: {
    //             ...(id_project_phase && { id_project_phase }),
    //           },
    //           include: [
    //             {
    //               model: Project,
    //               required: !!(cd_priority || id_project),
    //               as: 'project',
    //               attributes: ['id_project', 'nm_project'],
    //               where: {
    //                 ...(cd_priority && { cd_priority }),
    //                 ...(id_project && { id_project }),
    //               },
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   ],
    // });

    return {
      allocations: {
        count: getProducts.length,
        rows: productHistories.rows,
      },
    };
  }
}
