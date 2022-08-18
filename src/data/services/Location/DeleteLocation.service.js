import {
  LocationRepository,
  PolygonAreaRepository,
} from '../../database/repositories';

export class DeleteLocationService {
  async execute({ id_location }) {
    const repository = new LocationRepository();
    const polygonAreaRepository = new PolygonAreaRepository();

    const verifyLocationExists = await repository.findLocationById({
      id_location,
    });

    if (!verifyLocationExists)
      return {
        error: `Não há nenhuma Localização da Obra registrada com este ID -> ${id_location}.`,
      };

    const verifyFk = await polygonAreaRepository.verifyLocation({
      id_location,
    });

    if (verifyFk.length > 0) {
      return {
        error:
          'Não foi possível excluir a Localização da Obra pois existem Vértices do Polígono da Área associados',
      };
    }

    await repository.deleteLocation({
      id_location,
    });

    return {
      message: 'Localização da Obra excluída com sucesso!',
    };
  }
}
