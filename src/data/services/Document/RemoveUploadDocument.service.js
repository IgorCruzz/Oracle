import { s3 } from '../../../config/s3';
import { DocumentRepository } from '../../database/repositories';

export class RemoveUploadDocumentService {
  async execute(id_document) {
    const repository = new DocumentRepository();

    const findDocument = await repository.findDocumentById({
      id_document,
    });

    if (!findDocument) {
      return {
        error: `Não há um Documento com este ID -> ${id_document}`,
      };
    }

    const { nm_file } = findDocument;

    if (!nm_file) {
      return {
        error: 'Não há arquivo para ser removido!’',
      };
    }

    s3.deleteObject(
      {
        Bucket:  process.env.BUCKET,
        Key: `documents/${nm_file}`,
      },
      (err, data) => {
        if (err) return console.log(err);

        console.log(data);
      }
    );

    await repository.updateDocument(id_document, {
      dt_upload: null,
      nm_file: null,
      nm_original_file: null,
    });

    return {
      message: 'Arquivo removido com sucesso!',
    };
  }
}
