import { CityRepository } from '../../database/repositories';

export class DeleteCityService {
  async execute({ id }) {
    const repository = new CityRepository();

    const verifyCityExists = await repository.findCityById({
      id,
    });

    if (!verifyCityExists)
      return {
        error: `Não existe um município registrado com este ID -> ${id}.`,
      };

    await repository.deleteCity({
      id,
    });

    return {
      message: 'Município deletado com sucesso!',
    };
  }
}
