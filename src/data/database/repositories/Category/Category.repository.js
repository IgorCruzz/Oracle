import { Category } from '../../models';

export class CategoryRepository {
  async createCategory({ name }) {
    await Category.create({
      NM_CATEGORY: name.toLowerCase().trim(),
    });
  }

  async findCategories({ page, limit }) {
    return await Category.findAll({
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
    });
  }

  async findCategory({ name }) {
    return await Category.findOne({
      where: {
        NM_CATEGORY: name.toLowerCase().trim(),
      },
      raw: true,
    });
  }

  async findCategoryById({ id }) {
    return await Category.findOne({
      where: {
        ID_CATEGORY: id,
      },
      raw: true,
    });
  }

  async deleteCategory({ id }) {
    await Category.destroy({
      where: { ID_CATEGORY: id },
    });
  }

  async updateCategory({ id, name }) {
    const category = await Category.findOne({
      where: {
        ID_CATEGORY: id,
      },
    });

    return category.update({
      NM_CATEGORY: name.toLowerCase().trim(),
    });
  }
}
