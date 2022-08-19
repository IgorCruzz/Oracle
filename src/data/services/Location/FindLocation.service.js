import { LocationRepository } from '../../database/repositories';

export class FindLocationService {
  async execute({ id_location }) {
    const repository = new LocationRepository();

    const findLocation = await repository.findLocationById({
      id_location,
      populate: true,
    });

    if (!findLocation)
      return {
        error: `Não há nenhuma Localização da Obra registrada com este ID -> ${id_location}.`,
      };

    return {
      location: findLocation,
    };
  }
}
