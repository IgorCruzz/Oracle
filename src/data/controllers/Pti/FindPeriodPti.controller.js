import { FindPeriodPtiService } from '../../services';

export class FindPeriodPtiController {
  async handle(req, res) {
    try {
      const {
        page,
        limit,
        id_allocation_period,
        nm_professional,
        id_role,
        id_grade,
        id_sector,
        user_alocated,
      } = req.query;

      const service = new FindPeriodPtiService();

      const response = await service.execute({
        page,
        limit,
        id_allocation_period,
        nm_professional,
        id_role,
        id_grade,
        id_sector,
        user_alocated,
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
      console.log(err);
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
