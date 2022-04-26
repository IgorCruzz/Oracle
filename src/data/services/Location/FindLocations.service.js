import { LocationRepository } from '../../database/repositories';

export class FindLocationsService {
  async execute({ page, limit, id_project }) {
    const repository = new LocationRepository();

    const findLocations = await repository.findLocations({
      limit,
      page,
      id_project,
    });

    if (findLocations.length === 0)
      return { error: 'Não há nenhuma Localização de Canteiro registrada.' };

    return {
      locations: findLocations,
    };
  }
}
