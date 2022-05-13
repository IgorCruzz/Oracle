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

    const polygonAreaExists = await repository.findPolygonArea(data);

    if (polygonAreaExists) {
      return {
        error: `Já existe uma Vértice do polígono da área registrado com estes dados para a Localização de Canteiro com o ID -> ${verifyLocationExists.id_location} `,
      };
    }

    const polygonArea = await repository.createPolygonArea(data);

    return {
      message: 'Vértice do Polígono da Área registrado com sucesso!',
      polygonArea,
    };
  }
}
