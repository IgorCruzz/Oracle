import 'dotenv/config';
import utf8 from 'utf8';
import { DocumentRepository } from '../../database/repositories';

export class UploadDocumentService {
  async execute(id_document, { key, size, originalname }) {
    const repository = new DocumentRepository();

    const findDocument = await repository.findDocumentById({
      id_document,
    });

    if (size > 200000000) {
      return {
        error: `O limíte máximo para upload é 200MB.`,
      };
    }

    if (!findDocument) {
      return {
        error: `Não há um Documento com este ID -> ${id_document}.`,
      };
    }

    await repository.updateDocument(id_document, {
      dt_upload: new Date(Date.now()).toISOString(),
      nm_file: key,
      nm_original_file: utf8.decode(originalname),
    });

    return {
      message: 'Upload realizado com sucesso!',
      document: `${process.env.HOST}/documents/${key}`,
    };
  }
}
