import { FindProfessionalsService } from '../../services';

export class FindProfessionalsController {
  async handle(req, res) {
    try {
      const {
        id_role_grade,
        id_sector,
        id_user,
        in_delivery_analyst,
        limit,
        nm_professional,
        page,
      } = req.query;

      const service = new FindProfessionalsService();

      const response = await service.execute({
        id_role_grade,
        id_sector,
        id_user,
        in_delivery_analyst,
        limit,
        nm_professional,
        page,
      });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      const { count, rows } = response.professionals;

      return res.status(200).json({
        count,
        page,
        limit,
        professionals: rows,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
