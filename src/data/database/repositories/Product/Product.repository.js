import { Op } from 'sequelize';
import { Product, Role, Project_phase, Project } from '../../models';

export class ProductRepository {
  async createManyProducts(data) {
    const product = await Product.bulkCreate(data);

    return product.map(values => values.dataValues);
  }

  async createProduct(data) {
    const { nm_product, ds_note_required_action, id_project_phase } = data;

    const findProject = await Product.findAll({
      where: {
        id_project_phase,
      },
    });

    const count = await Product.findAndCountAll({
      where: {
        id_project_phase,
      },
    });

    let maior;

    if (count.count > 0) {
      const orderA = findProject.map(a => a.dataValues.nu_order);

      maior = orderA.sort((a, b) => {
        return b - a;
      });

      maior = maior[0] + 1;
    } else {
      maior = 1;
    }

    const createdProduct = await Product.create({
      ...data,
      nm_product: nm_product.trim(),
      nu_order: maior,
      ds_note_required_action:
        ds_note_required_action && ds_note_required_action.trim(),
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Product.findOne({
      where: {
        nm_product: createdProduct.dataValues.nm_product,
      },
      include: [
        { model: Role, as: 'suggested_role' },
        { model: Project_phase, as: 'project_phase' },
      ],
    });
  }

  async verifyRole({ id_suggested_role }) {
    return await Product.findAll({
      include: [
        {
          model: Role,
          as: 'suggested_role',
          where: { id_role: id_suggested_role },
        },
      ],
    });
  }

  async getTest({ id_project_phase }) {
    return await Product.findAll({
      where: {
        id_project_phase,
      },
      raw: true,
    });
  }

  async verifyProjectPhase({ id_project_phase }) {
    return await Product.findAll({
      include: [
        {
          model: Project_phase,
          as: 'project_phase',
          where: { id_project_phase },
        },
      ],
    });
  }

  async findProducts({
    page,
    limit,
    id_project_phase,
    id_suggested_role,
    nm_product,
  }) {
    return nm_product
      ? await Product.findAndCountAll({
          where: {
            nm_product: {
              [Op.like]: `%${nm_product.trim()}%`,
            },
          },
          limit: limit !== 'all' ? Number(limit) : null,
          order: [['nu_order', 'ASC']],

        offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
          include: [
            id_project_phase
              ? {
                  model: Project_phase,
                  as: 'project_phase',
                  required: true,
                  where: { id_project_phase },
                  include: [
                    {
                      model: Project,
                      as: 'project',
                      required: true,
                      where: {
                        dt_deleted_at: null,
                      },
                    },
                  ],
                }
              : {
                  model: Project_phase,
                  as: 'project_phase',
                  required: true,
                  include: [
                    {
                      model: Project,
                      as: 'project',
                      required: true,
                      where: {
                        dt_deleted_at: null,
                      },
                    },
                  ],
                },
            id_suggested_role
              ? {
                  model: Role,
                  as: 'suggested_role',
                  where: { id_role: id_suggested_role },
                }
              : { model: Role, as: 'suggested_role' },
          ],
        })
      : await Product.findAndCountAll({
          limit: limit !== 'all' ? Number(limit) : null,
        offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
          order: [['nu_order', 'ASC']],
          include: [
            id_project_phase
              ? {
                  model: Project_phase,
                  as: 'project_phase',
                  required: true,
                  where: { id_project_phase },
                  include: [
                    {
                      model: Project,
                      as: 'project',
                      required: true,
                      where: {
                        dt_deleted_at: null,
                      },
                    },
                  ],
                }
              : {
                  model: Project_phase,
                  as: 'project_phase',
                  required: true,
                  include: [
                    {
                      model: Project,
                      as: 'project',
                      required: true,
                      where: {
                        dt_deleted_at: null,
                      },
                    },
                  ],
                },
            id_suggested_role
              ? {
                  model: Role,
                  as: 'suggested_role',
                  where: { id_role: id_suggested_role },
                }
              : { model: Role, as: 'suggested_role' },
          ],
        });
  }

  async findProductByProductPhase({ nm_product, id_project_phase }) {
    return await Product.findOne({
      where: {
        nm_product: nm_product.trim(),
        id_project_phase,
      },
    });
  }

  async findProductByName({ nm_product, id_project_phase }) {
    return await Product.findOne({
      where: {
        nm_product: nm_product.trim(),
        id_project_phase,
      },
    });
  }

  async findProduct({ nm_product }) {
    return await Product.findOne({
      where: {
        nm_product: nm_product.trim(),
      },
      raw: true,
    });
  }

  async findProductById({ id_product, populate }) {
    if (populate) {
      return await Product.findOne({
        where: {
          id_product,
        },
        include: [
          { model: Role, as: 'suggested_role' },
          {
            model: Project_phase,
            as: 'project_phase',
            include: [
              {
                model: Project,
                as: 'project',
                where: {
                  dt_deleted_at: null,
                },
              },
            ],
          },
        ],
      });
    }

    return await Product.findOne({
      where: {
        id_product,
      },
      include: [
        { model: Role, as: 'suggested_role' },
        {
          model: Project_phase,
          as: 'project_phase',
          include: [
            {
              model: Project,
              as: 'project',
              where: {
                dt_deleted_at: null,
              },
            },
          ],
        },
      ],
    });
  }

  async deleteProduct({ id_product }) {
    await Product.destroy({
      where: { id_product },
    });
  }

  async updateProduct(id_product, data) {
    const { nm_product, ds_note_required_action, nu_order } = data;

    const product = await Product.findOne({
      where: {
        id_product,
      },
    });

    await product.update({
      ...data,
      nu_order,
      nm_product: nm_product.trim(),
      ds_note_required_action:
        ds_note_required_action && ds_note_required_action.trim(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Product.findOne({
      where: {
        nm_product: product.dataValues.nm_product,
      },
      include: [
        { model: Role, as: 'suggested_role' },
        { model: Project_phase, as: 'project_phase' },
      ],
    });
  }
}
