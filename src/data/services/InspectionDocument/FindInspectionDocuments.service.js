import { InspectionDocumentRepository } from '../../database/repositories';

export class FindInspectionDocumentsService {
  async execute({
    page,
    limit,
    id,
    id_inspection,
    nm_document,
    nm_original_file,
    nm_file
  }) {
    const repository = new InspectionDocumentRepository();

    const findInspectionDocuments = await repository.findInspectionDocuments({
      page,
      limit,
      id,
      id_inspection,
      nm_document,
      nm_original_file,
      nm_file
    });

    if (findInspectionDocuments.length === 0)
      return { error: 'Não há nenhum documento registrado.' };

    return {
      inspection_documents: findInspectionDocuments,
    };
  }
}
