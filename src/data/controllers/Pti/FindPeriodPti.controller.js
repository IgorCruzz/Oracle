import { FindPeriodPtiService } from '../../services';

export class FindPeriodPtiController {
  async handle(req, res) {
    try {
      const {
        page,
        limit,
        dt_start_allocation,
        dt_end_allocation,
        nm_professional,
        id_role,
        id_grade,
        id_sector,
      } = req.query;

      const service = new FindPeriodPtiService();

      const response = await service.execute({
        page,
        limit,
        dt_start_allocation,
        dt_end_allocation,
        nm_professional,
        id_role,
        id_grade,
        id_sector,
      });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      const { count, rows } = response.ptis;

      return res.status(200).json({
        count,
        page,
        limit,
        ptis: rows.getProfessionals,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
