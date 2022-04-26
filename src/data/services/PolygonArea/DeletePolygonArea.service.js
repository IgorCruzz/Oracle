import { PolygonAreaRepository } from '../../database/repositories';

export class DeletePolygonAreaService {
  async execute({ id_polygon_area }) {
    const repository = new PolygonAreaRepository();

    const verifyPolygonAreaExists = await repository.findPolygonAreaById({
      id_polygon_area,
    });

    if (!verifyPolygonAreaExists)
      return {
        error: `Não há nenhum Polígono de Área registrado com este ID -> ${id_polygon_area}.`,
      };

    await repository.deletePolygonArea({
      id_polygon_area,
    });

    return {
      message: 'Polígono de Área excluído com sucesso!',
    };
  }
}
