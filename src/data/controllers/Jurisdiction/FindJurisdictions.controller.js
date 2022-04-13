import { FindJurisdictionsService } from '../../services';

export class FindJurisdictionsController {
  async handle(req, res) {
    try {
      const { page, limit } = req.query;

      const service = new FindJurisdictionsService();

      const response = await service.execute({ page, limit });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        jurisdictions: response.jurisdictions,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  }
}
