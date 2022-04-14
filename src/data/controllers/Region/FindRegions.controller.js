import { FindRegionsService } from '../../services';

export class FindRegionsController {
  async handle(req, res) {
    try {
      const { page, limit } = req.query;

      const service = new FindRegionsService();

      const response = await service.execute({ page, limit });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        regions: response.regions,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  }
}