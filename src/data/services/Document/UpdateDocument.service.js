import {
  DocumentRepository,
  ProductRepository,
} from '../../database/repositories';
import { verifyDate } from '../../../utils/verifyDate';

export class UpdateDocumentService {
  async execute(id_document, data) {
    const { ds_document, id_product, dt_upload } = data;

    const repository = new DocumentRepository();

    let dtUpload;

    if (dt_upload) {
      dtUpload = verifyDate({
        value: dt_upload,
        msg: 'Data de upload inválida. Utilize o formato dd/mm/yyyy',
      });

      if (dtUpload.error) {
        return { error: dtUpload.error };
      }
    }

    const verifyDocumentExists = await repository.findDocumentById({
      id_document,
    });

    if (
      !verifyDocumentExists ||
      (verifyDocumentExists &&
        !verifyDocumentExists.dataValues.product.dataValues.project_phase)
    )
      return {
        error: `Não existe um Documento com este ID -> ${id_document}.`,
      };

    const productRepository = new ProductRepository();

    const verifyProductExists = await productRepository.findProductById({
      id_product,
    });

    if (!verifyProductExists)
      return {
        error: `Não há nenhum Produto registrado com este ID -> ${id_product}.`,
      };

    const verifyDocumentDescription = await repository.findDocument({
      ds_document,
    });

    if (
      verifyDocumentDescription &&
      verifyDocumentDescription.id_document !== Number(id_document)
    )
      return { error: 'Já existe um Documento registrado com este nome.' };

    const documentUpdated = await repository.updateDocument(id_document, {
      ...data,
      dtUpload,
    });

    return {
      message: 'Documento atualizado com sucesso!',
      document: documentUpdated,
    };
  }
}
