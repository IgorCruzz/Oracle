import { FindSectorService } from '../../services';

export class FindSectorController {
  async handle(req, res) {
    try {
      const { id_sector } = req.params;

      const service = new FindSectorService();

      const response = await service.execute({ id_sector });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        sector: response.sector,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
