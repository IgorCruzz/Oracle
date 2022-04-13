import { CreateAgencyService } from '../../services';

export class CreateAgencyController {
  async handle(req, res) {
    try {
      const service = new CreateAgencyService();

      const { name, jurisdictionId } = req.body;

      const response = await service.execute({ name, jurisdictionId });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
      });
    } catch (err) {
      return res.status(500).json({
        body: err,
      });
    }
  }
}
