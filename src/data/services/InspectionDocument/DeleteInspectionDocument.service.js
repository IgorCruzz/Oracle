import { InspectionDocumentRepository } from '../../database/repositories';

export class DeleteInspectionDocumentService {
  async execute({ id_inspection_document }) {
    const repository = new InspectionDocumentRepository();

    const verifyInspectionDocumentExists = await repository.findInspectionDocumentById(
      {
        id_inspection_document,
      }
    );

    if (!verifyInspectionDocumentExists)
      return {
        error: `Não há nenhum documento registrado com este ID -> ${id_inspection_document}.`,
      };

    await repository.deleteInspectionDocument({
      id_inspection_document,
    });

    return {
      message: 'Documento excluído com sucesso!',
    };
  }
}
