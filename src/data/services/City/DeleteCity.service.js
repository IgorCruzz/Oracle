import { CityRepository } from '../../database/repositories';

export class DeleteCityService {
  async execute({ id }) {
    const repository = new CityRepository();

    const verifyCityExists = await repository.findCityById({
      id,
    });

    if (!verifyCityExists) return { error: 'There is no city with this ID.' };

    await repository.deleteCity({
      id,
    });

    return {
      message: 'City deleted successfully!',
    };
  }
}
