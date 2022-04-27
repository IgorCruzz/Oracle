import { ProductRepository } from '../../database/repositories';

export class FindProductService {
  async execute({ id_product }) {
    const repository = new ProductRepository();

    const findProduct = await repository.findProjectById({
      id_product,
      populate: true,
    });

    if (!findProduct)
      return {
        error: `Não há nenhum Produto registrado com este ID -> ${id_product}.`,
      };

    return {
      product: findProduct,
    };
  }
}
