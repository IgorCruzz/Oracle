import { FindProductHistoryPtiFromProfessionalService } from '../../services';

export class FindProductHistoryPtiFromProfessionalController {
  async handle(req, res) {
    try {
      const { page, limit } = req.query;
      const { id_professional } = req.params;

      const service = new FindProductHistoryPtiFromProfessionalService();

      const response = await service.execute({
        page,
        limit,
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
        ptis: rows,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
