import { UpdateAgencyService } from '../../services';

export class UpdateProjectController {
  async handle(req, res) {
    try {
      const service = new UpdateAgencyService();

      const { id } = req.params;
      const { name, jurisdictionId } = req.body;

      const response = await service.execute({ name, id, jurisdictionId });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        agency: response.agency,
        message: response.message,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  }
}
