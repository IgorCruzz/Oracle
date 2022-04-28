import {
  DocumentRepository,
  ProductRepository,
} from '../../database/repositories';
import { verifyDate } from '../../../utils/verifyDate';

export class CreateDocumentService {
  async execute(data) {
    const { dt_upload, ds_document, id_product } = data;

    const repository = new DocumentRepository();
    const productRepository = new ProductRepository();

    const verifyProductExists = await productRepository.findProductById({
      id_product,
    });

    if (!verifyProductExists)
      return {
        error: `Não há nenhum produto registrada com este ID -> ${id_product}.`,
      };

    if (dt_upload) {
      const dtUpload = verifyDate({
        value: dt_upload,
        msg: 'Data de upload inválida. Utilize o formato dd/mm/yyyy',
      });

      if (dtUpload.error) {
        return { error: dtUpload.error };
      }
    }

    const verifyDocumentExists = await repository.findDocument({
      ds_document,
    });

    if (verifyDocumentExists)
      return { error: 'Já existe uma documento registrado com este nome.' };

    const document = await repository.createDocument(data);

    return {
      message: 'Documento registrado com sucesso!',
      document: document.dataValues,
    };
  }
}
