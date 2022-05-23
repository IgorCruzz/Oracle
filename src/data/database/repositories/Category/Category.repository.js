import { Op } from 'sequelize';
import { Category } from '../../models';

export class CategoryRepository {
  async createCategory({ name }) {
    const createdCategory = await Category.create({
      nm_category: name.trim(),
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Category.findOne({
      where: {
        nm_category: createdCategory.dataValues.nm_category,
      },
    });
  }

  async findCategories({ page, limit, nm_category }) {
    return nm_category
      ? await Category.findAndCountAll({
          where: {
            nm_category: {
              [Op.like]: `%${nm_category.trim()}%`,
            },
          },
          order: [['nm_category', 'ASC']],
          limit: limit !== 'all' ? Number(limit) : null,
          offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
          raw: true,
        })
      : await Category.findAndCountAll({
          limit: limit !== 'all' ? Number(limit) : null,
          order: [['nm_category', 'ASC']],
          offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
          raw: true,
        });
  }

  async findCategory({ name }) {
    return await Category.findOne({
      where: {
        nm_category: name.trim(),
      },
      raw: true,
    });
  }

  async findCategoryById({ id }) {
    return await Category.findOne({
      where: {
        id_category: id,
      },
      raw: true,
    });
  }

  async deleteCategory({ id }) {
    await Category.destroy({
      where: { id_category: id },
    });
  }

  async updateCategory({ id, name }) {
    const category = await Category.findOne({
      where: {
        id_category: id,
      },
    });

    await category.update({
      nm_category: name.trim(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Category.findOne({
      where: {
        nm_category: category.dataValues.nm_category,
      },
      raw: true,
    });
  }
}
