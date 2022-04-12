import { Categoria } from '../../models';

export class CategoryRepository {
  async createCategory({ name }) {
    await Categoria.create({
      NM_CATEGORIA: name.toLowerCase().trim(),
    });
  }

  async findCategories({ page, limit }) {
    return await Categoria.findAll({
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
    });
  }

  async findCategory({ name }) {
    return await Categoria.findOne({
      where: {
        NM_CATEGORIA: name.toLowerCase().trim(),
      },
      raw: true,
    });
  }

  async findCategoryById({ id }) {
    return await Categoria.findOne({
      where: {
        ID_CATEGORIA: id,
      },
      raw: true,
    });
  }

  async deleteCategory({ id }) {
    await Categoria.destroy({
      where: { ID_CATEGORIA: id },
    });
  }

  async updateCategory({ id, name }) {
    const category = await Categoria.findOne({
      where: {
        ID_CATEGORIA: id,
      },
    });

    return category.update({
      NM_CATEGORIA: name.toLowerCase().trim(),
    });
  }
}
