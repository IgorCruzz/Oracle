import { CreateSectorService } from '../../services';

export class CreatePhaseStatusController {
  async handle(req, res) {
    try {
      const service = new CreateSectorService();
      const { nm_sector } = req.body;

      const response = await service.execute({ nm_sector });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
        sector: response.sector,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
