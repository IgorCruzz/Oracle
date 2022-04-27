import { ProductRepository } from '../../database/repositories';

export class FindProductsService {
  async execute({ page, limit, id_project_phase, id_suggested_role, search }) {
    const repository = new ProductRepository();

    const findProducts = await repository.findProducts({
      id_project_phase,
      id_suggested_role,
      limit,
      page,
      search,
    });

    if (findProducts.length === 0)
      return { error: 'Não há nenhum produto registrado.' };

    return {
      products: findProducts,
    };
  }
}
