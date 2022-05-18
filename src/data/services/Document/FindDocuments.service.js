import { DocumentRepository } from '../../database/repositories';

export class FindDocumentsService {
  async execute({ page, limit, id_product }) {
    const repository = new DocumentRepository();
    const findDocuments = await repository.findDocuments({
      limit,
      page,
      id_product,
    });

    const getDocuments = findDocuments.rows.map(document => {
      return {
        count: findDocuments.count,
        rows: document.dataValues.product.dataValues.project_phase
          ? document.dataValues
          : [],
      };
    });

    if (getDocuments.length === 0)
      return { error: 'Não há nenhum Documento registrado.' };

    return {
      documents: findDocuments,
    };
  }
}
