import { UpdateSectorService } from '../../services';

export class UpdateSectorController {
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
        sector: response.sector,
        message: response.message,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
