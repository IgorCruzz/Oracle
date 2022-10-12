import {
  InspectionRepository,
  InspectionDocumentRepository,
} from '../../database/repositories';

export class DeleteInspectionService {
  async execute({ id_inspection }) {
    const repository = new InspectionRepository();
    const repositoryInspectionDocument = new InspectionDocumentRepository();

    const verifyInspectionExists = await repository.findInspectionById({
      id_inspection,
    });

    if (!verifyInspectionExists)
      return {
        error: `Não há nenhuma vistoria registrada com este ID -> ${id_inspection}.`,
      };

    const verifyDocument = await repositoryInspectionDocument.findInspectionDocumentByIdInspection(
      {
        id_inspection,
      }
    );

    if (verifyDocument) {
      return {
        error:
          'Não foi possível excluir a Vistoria pois há documento(s) anexado(s)',
      };
    }

    await repository.deleteInspection({
      id_inspection,
    });

    return {
      message: 'Vistoria excluída com sucesso!',
    };
  }
}
