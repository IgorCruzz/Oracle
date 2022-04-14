import { FindAgencyService } from '../../services';

export class FindAgencyController {
  async handle(req, res) {
    try {
      const { id } = req.params;

      const service = new FindAgencyService();

      const response = await service.execute({ id });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        agency: response.agency,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  }
}
