import { DocumentRepository } from '../../database/repositories';

export class FindDocumentService {
  async execute({ id_document }) {
    const repository = new DocumentRepository();

    const findDocument = await repository.findDocumentById({
      id_document,
      populate: true,
    });

    if (!findDocument)
      return {
        error: `Não existe um Documento com este ID -> ${id_document}.`,
      };

    return {
      document: findDocument,
    };
  }
}
