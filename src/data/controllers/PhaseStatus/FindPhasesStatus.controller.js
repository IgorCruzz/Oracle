import { FindPhasesStatusService } from '../../services';

export class FindPhasesStatusController {
  async handle(req, res) {
    try {
      const { page, limit, ds_status } = req.query;

      const service = new FindPhasesStatusService();

      const response = await service.execute({ page, limit, ds_status });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      const { count, rows } = response.status;

      return res.status(200).json({
        count,
        page,
        limit,
        status: rows,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
