import { FindContactHistoriesService } from '../../services';

export class FindContactHistoriesController {
  async handle(req, res) {
    try {
      const { page, limit, id_contact } = req.query;

      const service = new FindContactHistoriesService();

      const response = await service.execute({ page, limit, id_contact });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      const { count, rows } = response.contactHistories;

      return res.status(200).json({
        count,
        page,
        limit,
        contactHistories: rows,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
