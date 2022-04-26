import { FindRegionService } from '../../services';

export class FindRegionController {
  async handle(req, res) {
    try {
      const { id } = req.params;

      const service = new FindRegionService();

      const response = await service.execute({ id });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        region: response.region,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
