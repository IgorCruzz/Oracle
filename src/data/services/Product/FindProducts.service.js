import { ProductRepository } from '../../database/repositories';

export class FindProductsService {
  async execute({
    page,
    limit,
    id_project_phase,
    id_suggested_role,
    nm_product,
  }) {
    const repository = new ProductRepository();

    const findProducts = await repository.findProducts({
      id_project_phase,
      id_suggested_role,
      limit,
      page,
      nm_product,
    });

    if (findProducts.length === 0)
      return { error: 'Não há nenhum Produto registrado.' };

    return {
      products: findProducts,
    };
  }
}
