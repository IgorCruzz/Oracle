import { InspectionDocumentRepository } from '../../database/repositories';

export class FindInspectionDocumentsService {
  async execute({
    page,
    limit,
    id,
    nm_original_file,
    dt_media,
    id_timelapse_coordinates,
    id_inspection_document,
    id_inspection,
  }) {
    const repository = new InspectionDocumentRepository();

    const findInspectionDocuments = await repository.findInspectionDocuments({
      page,
      limit,
      id,
      nm_original_file,
      dt_media,
      id_timelapse_coordinates,
      id_inspection_document,
      id_inspection,
    });

    if (findInspectionDocuments.length === 0)
      return { error: 'Não há nenhum documento registrado.' };

    return {
      inspection_documents: findInspectionDocuments,
    };
  }
}
