import { LocationRepository } from '../../database/repositories';

export class FindLocationsService {
  async execute({ page, limit, id_project, search }) {
    const repository = new LocationRepository();

    const findLocations = await repository.findLocations({
      limit,
      page,
      id_project,
      search,
    });

    if (findLocations.length === 0)
      return { error: 'Não há nenhuma Localização de Canteiro registrada.' };

    return {
      locations: findLocations,
    };
  }
}
