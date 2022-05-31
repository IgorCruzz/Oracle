import fs from 'fs';
import { resolve } from 'path';
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

    fs.unlinkSync(
      resolve(__dirname, '..', '..', '..', '..', 'tmp', 'documents', nm_file),
      () => {}
    );

    await repository.updateDocument(id_document, {
      dt_upload: null,
      nm_file: null,
    });

    return {
      message: 'Arquivo removido com sucesso!',
    };
  }
}
