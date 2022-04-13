import { CityRepository } from '../../database/repositories';

export class UpdateCityService {
  async execute({ name, id }) {
    const repository = new CityRepository();

    const verifyCitiesExists = await repository.findCityById({
      id,
    });

    if (!verifyCitiesExists)
      return { error: 'There is no city with this name.' };

    const cityUpdated = await repository.updateCity({
      id,
      name,
    });

    return {
      city: cityUpdated,
    };
  }
}
