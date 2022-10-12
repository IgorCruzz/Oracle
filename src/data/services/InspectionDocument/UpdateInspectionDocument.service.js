import { InspectionDocumentRepository } from '../../database/repositories';

export class UpdateInspectionDocumentService {
  async execute(id_inspection_document, req) {
    const repository = new InspectionDocumentRepository();

    const verifyExistsNmDocument = await repository.findInspectionDocumentByNmDocument(
      {
        nm_document: req.nm_document,
        id_inspection: req.id_inspection,
      }
    );

    if (
      verifyExistsNmDocument &&
      verifyExistsNmDocument.id_inspection_document !==
        Number(id_inspection_document)
    ) {
      return { error: 'Você já adicionou um documento com este nome!' };
    }

    const InspectionDocumentUpdated = await repository.updateInspectionDocument(
      id_inspection_document,
      req
    );

    if (InspectionDocumentUpdated.error) {
      return { error: InspectionDocumentUpdated.error };
    }
    return {
      message: 'Documento atualizado com sucesso!',
      inspection_document: InspectionDocumentUpdated,
    };
  }
}
