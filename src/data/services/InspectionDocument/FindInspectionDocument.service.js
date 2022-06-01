import { InspectionDocumentRepository } from '../../database/repositories';

export class FindInspectionDocumentService {
  async execute({ id_inspection_document }) {
    const repository = new InspectionDocumentRepository();

    const findInspection = await repository.findInspectionDocumentById({
      id_inspection_document,
      populate: true,
    });

    if (!findInspectionDocument)
      return {
        error: `Não há nenhuma vistoria registrada com este ID -> ${id_inspection_document}.`,
      };

    return {
      inspection_document: findInspectionDocument,
    };
  }
}
