import { CityRepository } from '../../database/repositories';

export class FindCityService {
  async execute({ id }) {
    const repository = new CityRepository();

    const findCity = await repository.findCityById({
      id,
      populate: true,
    });

    if (!findCity)
      return {
        error: `Não existe um município registrado com este ID -> ${id}.`,
      };

    return {
      city: findCity,
    };
  }
}
