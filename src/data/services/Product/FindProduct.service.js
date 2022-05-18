import { ProductRepository } from '../../database/repositories';

export class FindProductService {
  async execute({ id_product }) {
    const repository = new ProductRepository();

    const findProduct = await repository.findProductById({
      id_product,
      populate: true,
    });

    if (!findProduct || (findProduct && !findProduct.dataValues.project_phase))
      return {
        error: `Não há nenhum Produto registrado com este ID -> ${id_product}.`,
      };

    return {
      product: findProduct,
    };
  }
}
