import { FindRoleGradesService } from '../../services';

export class FindRoleGradiesController {
  async handle(req, res) {
    try {
      const {
        id_grade,
        id_role,
        limit,
        page,
        vl_hour_cost,
        vl_salary,
      } = req.query;

      const service = new FindRoleGradesService();

      const response = await service.execute({
        id_grade,
        id_role,
        limit,
        page,
        vl_hour_cost,
        vl_salary,
      });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      const { count, rows } = response.coustsHH;

      return res.status(200).json({
        count,
        page,
        limit,
        coustsHH: rows,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
