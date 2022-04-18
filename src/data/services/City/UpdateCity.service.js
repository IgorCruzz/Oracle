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

    const verifyCityName = await repository.findCity({
      name,
    });

    if (verifyCityName)
      return { error: 'Já foi registrado um município com este nome.' };

    const cityUpdated = await repository.updateCity({
      id,
      name,
    });

    return {
      message: 'Município atualizado com sucesso!',
      city: cityUpdated,
    };
  }
}
