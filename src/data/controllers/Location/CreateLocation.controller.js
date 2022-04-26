import { CreateLocationService } from '../../services';

export class CreateLocationController {
  async handle(req, res) {
    try {
      const service = new CreateLocationService();

      const response = await service.execute(req.body);

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
        location: response.location,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  }
}
