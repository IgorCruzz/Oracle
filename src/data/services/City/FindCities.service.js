import { CityRepository } from '../../database/repositories';

export class FindCitiesService {
  async execute({ page, limit, regionId, search }) {
    const repository = new CityRepository();

    const findCities = await repository.findCites({
      limit,
      page,
      regionId,
      search,
    });

    if (findCities.length === 0)
      return { error: 'Não há municípios registrados.' };

    return {
      cities: findCities,
    };
  }
}
