import { Op } from 'sequelize';
import { Product, Role, Project_phase } from '../../models';

export class ProductRepository {
  async createProduct(data) {
    const { nm_product, ds_note_required_action } = data;

    const createdProduct = await Product.create({
      ...data,
      nm_product: nm_product.trim(),
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

  async findProducts({
    page,
    limit,
    id_project_phase,
    id_suggested_role,
    search,
  }) {
    return search
      ? await Product.findAndCountAll({
          where: {
            nm_product: {
              [Op.like]: `%${search.trim()}%`,
            },
          },
          limit: Number(limit),
          order: [['nm_product', 'ASC']],
          offset: (Number(page) - 1) * Number(limit),
          include: [
            id_project_phase
              ? {
                  model: Project_phase,
                  as: 'project_phase',
                  where: { id_project_phase },
                }
              : { model: Project_phase, as: 'project_phase' },
            id_suggested_role
              ? {
                  model: Role,
                  as: 'suggested_role',
                  where: { id_suggested_role },
                }
              : { model: Role, as: 'suggested_role' },
          ],
        })
      : await Product.findAndCountAll({
          limit: Number(limit),
          offset: (Number(page) - 1) * Number(limit),
          order: [['nm_product', 'ASC']],
          include: [
            id_project_phase
              ? {
                  model: Project_phase,
                  as: 'project_phase',
                  where: { id_project_phase },
                }
              : { model: Project_phase, as: 'project_phase' },
            id_suggested_role
              ? {
                  model: Role,
                  as: 'suggested_role',
                  where: { id_suggested_role },
                }
              : { model: Role, as: 'suggested_role' },
          ],
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
          { model: Project_phase, as: 'project_phase' },
        ],
      });
    }

    return await Product.findOne({
      where: {
        id_product,
      },
      raw: true,
    });
  }

  async deleteProduct({ id_product }) {
    await Product.destroy({
      where: { id_product },
    });
  }

  async updateProduct(id_product, data) {
    const { nm_product, ds_note_required_action } = data;

    const product = await Product.findOne({
      where: {
        id_product,
      },
    });

    await product.update({
      ...data,
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
