import { Categoria } from '../../models';

export class CategoryRepository {
  async createCategory({ name }) {
    await Categoria.create({
      NM_CATEGORIA: name.toLowerCase().trim(),
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

  async deleteCategory({ id }) {
    await Categoria.destroy({
      where: { ID_CATEGORIA: id },
    });
  }
}
