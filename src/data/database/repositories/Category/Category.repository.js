import { Categoria } from '../../models';

export class CategoryRepository {
  async createCategory({ name }) {
    await Categoria.create({
      NM_CATEGORIA: name,
    });
  }

  async findCategory({ name }) {
    return await Categoria.findOne({
      where: {
        NM_CATEGORIA: name,
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
