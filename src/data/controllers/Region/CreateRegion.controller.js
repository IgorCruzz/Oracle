import { CreateRegionService } from '../../services';

export class CreateRegionController {
  async handle(req, res) {
    try {
      const service = new CreateRegionService();
      const { name } = req.body;

      const response = await service.execute({ name });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  }
}
