import { CityRepository } from '../../database/repositories';

export class FindCitiesService {
  async execute({ page, limit, regionId }) {
    const repository = new CityRepository();

    const findCities = await repository.findCites({
      limit,
      page,
      regionId,
    });

    if (findCities.length === 0)
      return { error: 'There are no registered cities.' };

    return {
      cities: findCities,
    };
  }
}
