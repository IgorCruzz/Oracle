import { DocumentRepository } from '../../database/repositories';

export class UploadDocumentService {
  async execute(id_document, { filename, size }) {
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
      nm_file: filename,
    });

    return {
      message: 'Upload realizado com sucesso!',
      document: `http://143.198.191.56:3030/documents/${filename}`,
    };
  }
}
