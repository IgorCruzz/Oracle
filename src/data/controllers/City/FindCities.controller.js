import { FindCitiesService } from '../../services';

export class FindCitiesController {
  async handle(req, res) {
    try {
      const { page, limit, regionId } = req.query;

      const service = new FindCitiesService();

      const response = await service.execute({ page, limit, regionId });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        cities: response.cities,
      });
    } catch (err) {
      return res.status(500).json({
        body: err,
      });
    }
  }
}
