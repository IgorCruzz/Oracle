import { FindProfessionalsService } from '../../services';

export class FindProfessionalsController {
  async handle(req, res) {
    try {
      const {
        id_role_grade,
        id_sector,
        id_user,
        in_delivery_analyst,
        nm_professional,
        in_active,
        limit,
        page,
        ds_email_login,
        has_no_association,
      } = req.query;

      const service = new FindProfessionalsService();

      const response = await service.execute({
        id_role_grade,
        id_sector,
        id_user,
        in_delivery_analyst,
        in_active,
        nm_professional,
        limit,
        page,
        ds_email_login,
        has_no_association,
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
