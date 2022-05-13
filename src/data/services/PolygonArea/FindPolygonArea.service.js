import { PolygonAreaRepository } from '../../database/repositories';

export class FindPolygonAreaService {
  async execute({ id_polygon_area }) {
    const repository = new PolygonAreaRepository();

    const findpolygonArea = await repository.findPolygonAreaById({
      id_polygon_area,
      populate: true,
    });

    if (!findpolygonArea)
      return {
        error: `Não há nenhuma Vertice do polígono da área registrado com este ID -> ${id_polygon_area}.`,
      };

    return {
      polygonArea: findpolygonArea,
    };
  }
}
