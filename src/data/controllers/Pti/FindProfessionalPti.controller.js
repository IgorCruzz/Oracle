import { FindProfessionalPtiService } from '../../services';

export class FindProfessionalPtiController {
  async handle(req, res) {
    try {
      const { page, limit, id_allocation_period, id_professional } = req.query;

      const service = new FindProfessionalPtiService();

      const response = await service.execute({
        page,
        limit,
        id_allocation_period,
        id_professional,
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
        ptis: rows.getAllocations,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
