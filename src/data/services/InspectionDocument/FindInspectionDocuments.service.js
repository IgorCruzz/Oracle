import { InspectionDocumentRepository } from '../../database/repositories';

export class FindInspectionDocumentsService {
  async execute({
    page,
    limit,
    id,
    nm_original_file,
    dt_media,
    id_timelapse_coordinates
  }) {
    const repository = new InspectionDocumentRepository();

    const findInspectionDocuments = await repository.findInspectionDocuments({
      page,
      limit,
      id,
      nm_original_file,
      dt_media,
      id_timelapse_coordinates
    });

    if (findInspectionDocuments.length === 0)
      return { error: 'Não há nenhum documento registrado.' };

    return {
      inspection_documents: findInspectionDocuments,
    };
  }
}
