import {
  InspectionDocumentRepository,
  InspectionRepository
} from '../../database/repositories';

export class CreateInspectionDocumentService {
  async execute(data) {
    const {
      nm_document,
      nm_file,
      id_inspection
    } = data.data;
    const repository = new InspectionDocumentRepository();
    const inspectionRepository = new InspectionRepository();

    const inspectionExists = await inspectionRepository.findInspectionById({
      id_inspection: id_inspection, 
      populate: false
    });
    if (!inspectionExists) {
      return {
        error: `Não há nenhuma vistoria registrada com este ID -> ${id_inspection}.`,
      };
    }
    const inspection_document = await repository.createInspectionDocument({
      ...data,
    });

    if (inspection_document.error) {
      return { error: inspection_document.error };
    }

    return {
      message: 'Documento adicionada com sucesso!',
      inspection_document,
    };
  }
}
