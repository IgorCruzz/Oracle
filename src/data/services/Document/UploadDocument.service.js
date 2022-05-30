import { DocumentRepository } from '../../database/repositories';

export class UploadDocumentService {
  async execute(id_document, { filename }) {
    const repository = new DocumentRepository();

    const findDocument = await repository.findDocumentById({
      id_document,
    });

    if (!findDocument) {
      return {
        error: `Não há um Documento com este ID -> ${id_document}`,
      };
    }

    await repository.updateDocument(id_document, {
      dt_upload: new Date(Date.now()).toISOString(),
      nm_file: filename,
    });

    return {
      message: 'Upload realizado com sucesso!',
      document: `http://localhost:3030/documents/${filename}`,
    };
  }
}
