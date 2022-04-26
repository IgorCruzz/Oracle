import { FindLocationService } from '../../services';

export class FindLocationController {
  async handle(req, res) {
    try {
      const { id_location } = req.params;

      const service = new FindLocationService();

      const response = await service.execute({ id_location });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        location: response.location,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
