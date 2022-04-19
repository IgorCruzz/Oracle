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

      const { count, rows } = response.jurisdictions;

      return res.status(200).json({
        count,
        page,
        limit,
        jurisdictions: rows,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  }
}
