import { PolygonAreaRepository } from '../../database/repositories';

export class FindPolygonAreasService {
  async execute({ page, limit, id_location }) {
    const repository = new PolygonAreaRepository();

    const findPolygonAreas = await repository.findPolygonAreas({
      limit,
      page,
      id_location,
    });

    if (findPolygonAreas.length === 0)
      return { error: 'Não há nenhum Polígono de Área registrado.' };

    return {
      polygonAreas: findPolygonAreas,
    };
  }
}
