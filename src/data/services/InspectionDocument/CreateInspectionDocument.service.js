import {
  InspectionDocumentRepository,
  InspectionRepository,
} from '../../database/repositories';

export class CreateInspectionDocumentService {
  async execute(req) {
    const repository = new InspectionDocumentRepository();
    const inspectionRepository = new InspectionRepository();

    const inspectionExists = await inspectionRepository.findInspectionById({
      id_inspection: req.id_inspection,
      populate: false,
    });
    if (!inspectionExists) {
      return {
        error: `Não há nenhuma vistoria registrada com este ID -> ${req.id_inspection}.`,
      };
    }
    const inspection_document = await repository.createInspectionDocument(req);

    return {
      message: 'Documento adicionado com sucesso!',
      inspection_document,
    };
  }
}
