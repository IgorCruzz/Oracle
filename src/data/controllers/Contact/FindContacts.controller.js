import { FindContactsService } from '../../services';

export class FindContactsController {
  async handle(req, res) {
    try {
      const { page, limit } = req.query;

      const service = new FindContactsService();

      const response = await service.execute({ page, limit });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      const { count, rows } = response.contacts;

      return res.status(200).json({
        count,
        page,
        limit,
        contacts: rows,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
