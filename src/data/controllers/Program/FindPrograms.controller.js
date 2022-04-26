import { FindProgramsService } from '../../services';

export class FindProgramsController {
  async handle(req, res) {
    try {
      const { page, limit, search } = req.query;

      const service = new FindProgramsService();

      const response = await service.execute({ page, limit, search });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      const { count, rows } = response.programs;

      return res.status(200).json({
        count,
        page,
        limit,
        programs: rows,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
