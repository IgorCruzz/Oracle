import { CityRepository } from '../../database/repositories';

export class UpdateCityService {
  async execute({ name, id }) {
    const repository = new CityRepository();

    const verifyCitiesExists = await repository.findCityById({
      id,
    });

    if (!verifyCitiesExists)
      return {
        error: `Não existe um município registrado com este ID -> ${id}.`,
      };

    const cityUpdated = await repository.updateCity({
      id,
      name,
    });

    return {
      city: cityUpdated,
    };
  }
}
