import { UpdateAgencyService } from '../../services';

export class UpdateAgencyController {
  async handle(req, res) {
    try {
      const service = new UpdateAgencyService();

      const { id } = req.params;
      const { name, jurisdiction } = req.body;

      const response = await service.execute({ name, id, jurisdiction });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        agency: response.agency,
        message: response.message,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  }
}
