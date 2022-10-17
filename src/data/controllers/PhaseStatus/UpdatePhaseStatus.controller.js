import { UpdateSectorService } from '../../services';

export class UpdatePhaseStatusController {
  async handle(req, res) {
    try {
      const service = new UpdateSectorService();

      const { id_sector } = req.params;

      const response = await service.execute(id_sector, req.body);

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
