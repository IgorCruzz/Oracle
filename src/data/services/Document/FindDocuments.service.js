import { DocumentRepository } from '../../database/repositories';

export class FindDocumentsService {
  async execute({ page, limit, id_product }) {
    const repository = new DocumentRepository();
    const findDocuments = await repository.findDocuments({
      limit,
      page,
      id_product,
    });

    if (findDocuments.length === 0) {
      return { error: 'Não há Documentos registrados.' };
    }

    return {
      documents: findDocuments,
    };
  }
}
