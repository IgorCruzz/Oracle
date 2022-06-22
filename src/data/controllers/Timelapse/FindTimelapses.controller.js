import { FindTimelapsesService } from '../../services';

export class FindTimelapsesController {
  async handle(req, res) {
    try {
      const { page, limit, id_project_phase } = req.query;

      const service = new FindTimelapsesService();

      const response = await service.execute({
        page,
        limit,
        id_project_phase,
      });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      const { count, rows } = response.timelapses;

      return res.status(200).json({
        count,
        page,
        limit,
        timelapses: rows,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
