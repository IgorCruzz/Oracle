import { DeleteAgencyService } from '../../services';

export class DeleteLocationController {
  async handle(req, res) {
    try {
      const service = new DeleteAgencyService();
      const { id_location } = req.params;

      const response = await service.execute({ id_location });

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
