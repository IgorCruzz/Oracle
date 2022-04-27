import { ProductRepository } from '../../database/repositories';

export class DeleteProductService {
  async execute({ id_product }) {
    const repository = new ProductRepository();

    const verifyProductExists = await repository.findProductById({
      id_product,
    });

    if (!verifyProductExists)
      return {
        error: `Não há nenhum produto registrado com este ID -> ${id_product}.`,
      };

    await repository.deleteProduct({
      id_product,
    });

    return {
      message: 'Produto excluído com sucesso!',
    };
  }
}
