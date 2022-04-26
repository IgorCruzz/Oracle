import { FindPolygonAreasService } from '../../services';

export class FindPolygonAreasController {
  async handle(req, res) {
    try {
      const { page, limit, id_location } = req.query;

      const service = new FindPolygonAreasService();

      const response = await service.execute({
        page,
        limit,
        id_location,
      });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      const { count, rows } = response.polygonAreas;

      return res.status(200).json({
        count,
        page,
        limit,
        polygonAreas: rows,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
