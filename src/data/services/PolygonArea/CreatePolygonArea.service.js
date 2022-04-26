import {
  PolygonAreaRepository,
  LocationRepository,
} from '../../database/repositories';

export class CreatePolygonAreaService {
  async execute(data) {
    const { id_location } = data;

    const repository = new PolygonAreaRepository();
    const locationRepository = new LocationRepository();

    const verifyLocationExists = await locationRepository.findLocationById({
      id_location,
    });

    if (!verifyLocationExists)
      return {
        error: `Não há nenhuma Localização de Canteiro registrada com este ID -> ${id_location}.`,
      };

    const polygonArea = await repository.createPolygonArea(data);

    return {
      message: 'Polígono de Área registrado com sucesso!',
      polygonArea,
    };
  }
}
