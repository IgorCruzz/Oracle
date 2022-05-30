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

    await repository.updateDocument(id_document, {
      dt_upload: null,
      nm_file: null,
    });

    return {
      message: 'Arquivo removido com sucesso!',
    };
  }
}
