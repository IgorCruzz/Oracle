import { UpdateJurisdictionService } from '../../services';

export class UpdateJurisdictionController {
  async handle(req, res) {
    try {
      console.log(req);
      const service = new UpdateJurisdictionService();

      const { id } = req.params;
      const { name } = req.body;

      const response = await service.execute({ name, id });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        jurisdiction: response.jurisdiction,
      });
    } catch (err) {
      return res.status(500).json({
        body: err,
      });
    }
  }
}
