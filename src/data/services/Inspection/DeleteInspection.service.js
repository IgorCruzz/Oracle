import {
  InspectionRepository,
} from '../../database/repositories';

export class DeleteInspectionService {
  async execute({ id_inspection }) {
    const repository = new InspectionRepository();

    const verifyInspectionExists = await repository.findInspectionById({
      id_inspection,
    });

    if (!verifyInspectionExists)
      return {
        error: `Não há nenhuma vistoria registrada com este ID -> ${id_inspection}.`,
      };


    await repository.deleteInspection({
      id_inspection,
    });

    return {
      message: 'Vistoria excluída com sucesso!',
    };
  }
}
