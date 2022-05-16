import { FindGradiesService } from '../../services';

export class FindGradiesController {
  async handle(req, res) {
    try {
      const { page, limit, nm_grade } = req.query;

      const service = new FindGradiesService();

      const response = await service.execute({ page, limit, nm_grade });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      const { count, rows } = response.gradies;

      return res.status(200).json({
        count,
        page,
        limit,
        gradies: rows,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
