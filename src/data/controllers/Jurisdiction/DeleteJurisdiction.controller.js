import { DeleteJurisdictionService } from '../../services';

export class DeleteJurisdictionontroller {
  async handle(req, res) {
    try {
      const service = new DeleteJurisdictionService();
      const { id } = req.params;

      const response = await service.execute({ id });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
      });
    } catch (err) {
      return res.status(500).json({
        body: err,
      });
    }
  }
}
