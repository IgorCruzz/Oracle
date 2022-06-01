import { InspectionDocumentRepository } from '../../database/repositories';

export class UpdateInspectionDocumentService {
  async execute(id_inspection_document, file) {

    const repository = new InspectionDocumentRepository();
    const InspectionDocumentUpdated = await repository.updateInspectionDocument(id_inspection_document, file);

    if (InspectionDocumentUpdated.error) {
      return { error: InspectionDocumentUpdated.error };
    }
    return {
      message: 'Documento de vistoria salvo com sucesso!',
      inspection_document: InspectionDocumentUpdated,
    };
  }
}
