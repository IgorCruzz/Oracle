import { UpdateCityService } from '../../services';

export class UpdateCityController {
  async handle(req, res) {
    try {
      const service = new UpdateCityService();

      const { id } = req.params;
      const { name } = req.body;

      const response = await service.execute({ name, id });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        city: response.city,
      });
    } catch (err) {
      return res.status(500).json({
        body: err,
      });
    }
  }
}
