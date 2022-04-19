import { FindAgenciesService } from '../../services';

export class FindAgenciesController {
  async handle(req, res) {
    try {
      const { page, limit, jurisdictionId } = req.query;

      const service = new FindAgenciesService();

      const response = await service.execute({ page, limit, jurisdictionId });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      const { count, rows } = response.agencies;

      console.log(response.agencies);

      return res.status(200).json({
        count,
        page,
        limit,
        agencies: rows,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  }
}
