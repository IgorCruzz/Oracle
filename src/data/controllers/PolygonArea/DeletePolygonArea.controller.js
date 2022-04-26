import { DeletePolygonAreaService } from '../../services';

export class DeletePolygonAreaController {
  async handle(req, res) {
    try {
      const service = new DeletePolygonAreaService();
      const { id_polygon_area } = req.params;

      const response = await service.execute({ id_polygon_area });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
