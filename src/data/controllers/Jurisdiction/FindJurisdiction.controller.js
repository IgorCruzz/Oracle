import { FindJurisdictionService } from '../../services';

export class FindJurisdictionController {
  async handle(req, res) {
    try {
      const { id } = req.params;

      const service = new FindJurisdictionService();

      const response = await service.execute({ id });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        jurisdiction: response.jurisdiction,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  }
}
