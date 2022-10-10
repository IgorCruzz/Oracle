import { InspectionDocumentRepository } from '../../database/repositories';

export class FindInspectionDocumentService {
  async execute({ id_inspection_document }) {
    const repository = new InspectionDocumentRepository();

    const findInspection = await repository.findInspectionDocumentById({
      id_inspection_document,
      populate: true,
    });

    if (!findInspection)
      return {
        error: `Não há nenhuma documento registrado com este ID -> ${id_inspection_document}.`,
      };

    return {
      inspection_document: findInspection,
    };
  }
}
