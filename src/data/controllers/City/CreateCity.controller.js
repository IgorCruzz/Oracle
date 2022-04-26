import { CreateCityService } from '../../services';

export class CreateCityController {
  async handle(req, res) {
    try {
      const service = new CreateCityService();
      const { name, regionId } = req.body;

      const response = await service.execute({ name, regionId });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
        city: response.city,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
