import {
  ProductRepository,
  DocumentRepository,
} from '../../database/repositories';

export class DeleteProductService {
  async execute({ id_product }) {
    const repository = new ProductRepository();
    const documentRepository = new DocumentRepository();

    const verifyProductExists = await repository.findProductById({
      id_product,
    });

    if (!verifyProductExists)
      return {
        error: `Não há nenhum Produto registrado com este ID -> ${id_product}.`,
      };

    const verifyFk = await documentRepository.verifyRelationProduct({
      id_product,
    });

    if (verifyFk.length > 0) {
      return {
        error:
          'Não foi possível excluir o Produto pois existem Documentos associados.',
      };
    }

    await repository.deleteProduct({
      id_product,
    });

    return {
      message: 'Produto excluído com sucesso!',
    };
  }
}
