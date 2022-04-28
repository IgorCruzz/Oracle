import { DocumentRepository } from '../../database/repositories';

export class FindDocumentService {
  async execute({ id_document }) {
    const repository = new DocumentRepository();

    const findDocument = await repository.findDocumentById({
      id_document,
    });

    if (!findDocument)
      return {
        error: `Não existe um documento com este ID -> ${id_document}.`,
      };

    return {
      document: findDocument,
    };
  }
}
