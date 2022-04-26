import { LocationRepository } from '../../database/repositories';

export class DeleteLocationService {
  async execute({ id_location }) {
    const repository = new LocationRepository();

    const verifyLocationExists = await repository.findLocationById({
      id_location,
    });

    if (!verifyLocationExists)
      return {
        error: `Não há nenhuma Localização de Canteiro registrada com este ID -> ${id_location}.`,
      };

    await repository.deleteLocation({
      id_location,
    });

    return {
      message: 'Localização de Canteiro excluída com sucesso!',
    };
  }
}
