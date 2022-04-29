import { DocumentRepository } from '../../database/repositories';

export class FindDocumentsService {
  async execute({ page, limit, search }) {
    const repository = new DocumentRepository();

    const findDocuments = await repository.findDocuments({
      limit,
      page,
      search,
    });

    if (findDocuments.length === 0)
      return { error: 'Não há nenhum Documento registrado.' };

    return {
      documents: findDocuments,
    };
  }
}
