import { UpdateCityService } from '../../services';

export class UpdateCityController {
  async handle(req, res) {
    try {
      const service = new UpdateCityService();

      const { id } = req.params;
      const { name, regionId } = req.body;

      const response = await service.execute({ name, id, regionId });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        city: response.city,
        message: response.message,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  }
}
