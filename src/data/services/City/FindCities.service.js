import { CityRepository } from '../../database/repositories';

export class FindCitiesService {
  async execute({ page, limit, regionId, nm_city }) {
    const repository = new CityRepository();

    const findCities = await repository.findCites({
      limit,
      page,
      regionId,
      nm_city,
    });

    if (findCities.length === 0)
      return { error: 'Não há Municípios registrados.' };

    return {
      cities: findCities,
    };
  }
}
