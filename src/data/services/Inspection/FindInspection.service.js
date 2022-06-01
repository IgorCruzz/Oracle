import { InspectionRepository } from '../../database/repositories';

export class FindInspectionService {
  async execute({ id_inspection }) {
    const repository = new InspectionRepository();

    const findInspection = await repository.findInspectionById({
      id_inspection,
      populate: true,
    });

    if (!findInspection)
      return {
        error: `Não há nenhuma vistoria registrada com este ID -> ${id_inspection}.`,
      };

    return {
      inspection: findInspection,
    };
  }
}
