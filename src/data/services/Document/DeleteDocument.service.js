import { DocumentRepository } from '../../database/repositories';

export class DeleteDocumentService {
  async execute({ id_document }) {
    const repository = new DocumentRepository();

    const verifyDocumentExists = await repository.findDocumentById({
      id_document,
    });

    if (!verifyDocumentExists)
      return {
        error: `Não existe um documento com este ID -> ${id_document}.`,
      };

    await repository.deleteDocument({
      id_document,
    });

    return {
      message: 'Documento excluído com sucesso!',
    };
  }
}
