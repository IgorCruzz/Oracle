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

    if (
      !verifyProductExists ||
      (verifyProductExists && !verifyProductExists.dataValues.project_phase)
    )
      return {
        error: `Não há nenhum Produto registrado com este ID -> ${id_product}.`,
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

    const verifyDocumentExists = await repository.findDocumentName({
      ds_document,
      id_product,
    });

    if (verifyDocumentExists)
      return { error: 'Já existe uma Documento registrado com este nome.' };

    const document = await repository.createDocument(data);

    return {
      message: 'Documento registrado com sucesso!',
      document: document.dataValues,
    };
  }
}
