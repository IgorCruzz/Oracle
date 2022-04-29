import {
  PolygonAreaRepository,
  LocationRepository,
} from '../../database/repositories';

export class UpdatePolygonAreaService {
  async execute(id_polygon_area, data) {
    const { id_location } = data;

    const repository = new PolygonAreaRepository();
    const locationRepository = new LocationRepository();
    let locationExists;

    const verifyPolygonAreaExists = await repository.findPolygonAreaById({
      id_polygon_area,
    });

    if (!verifyPolygonAreaExists)
      return {
        error: `Não há nenhum Polígono de Área registrado com este ID -> ${id_polygon_area}.`,
      };

    if (id_location) {
      locationExists = await locationRepository.findLocationById({
        id_location,
      });

      if (!locationExists) {
        return {
          error: `Não há nenhuma Localização de Canteiros registrado com este ID -> ${id_location}.`,
        };
      }
    }

    const polygonAreaExists = await repository.findPolygonArea(data);

    if (
      polygonAreaExists &&
      polygonAreaExists.id_polygon_area !== Number(id_polygon_area)
    ) {
      return {
        error: `Já existe um Polígono de Área registrado com estes dados para a Localização de Canteiro com o ID -> ${locationExists.id_location} `,
      };
    }

    const polygonAreaUpdated = await repository.updatePolygonArea(
      id_polygon_area,
      data
    );

    return {
      message: 'Polígono de Área atualizado com sucesso!',
      polygonArea: polygonAreaUpdated,
    };
  }
}
