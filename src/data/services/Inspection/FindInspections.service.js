import { InspectionRepository } from '../../database/repositories';

export class FindInspectionsService {
  async execute({
    page,
    limit,
    id,
    id_project,
    id_project_phase,
    id_professional,
  }) {
    const repository = new InspectionRepository();

    const findInspections = await repository.findInspections({
      page,
      limit,
      id,
      id_project,
      id_project_phase,
      id_professional,
    });

    if (findInspections.length === 0)
      return { error: 'Não há nenhuma vistoria registrada.' };

    return {
      inspections: findInspections,
    };
  }
}
