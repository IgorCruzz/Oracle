import { CreatePolygonAreaService } from '../../services';

export class CreatePolygonAreaController {
  async handle(req, res) {
    try {
      const service = new CreatePolygonAreaService();

      const response = await service.execute(req.body);

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
        polygonArea: response.polygonArea,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
