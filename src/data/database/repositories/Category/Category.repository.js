import { Categoria } from '../../models';

export class CategoryRepository {
  async createCategory({ name }) {
    await Categoria.create({
      NM_CATEGORIA: name,
    });
  }
}
