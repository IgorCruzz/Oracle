import { FindCategoriesService } from '../../services';

export class FindCategoriesController {
  async handle(req, res) {
    try {
      const { page, limit } = req.query;

      const service = new FindCategoriesService();

      const response = await service.execute({ page, limit });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        categories: response.categories,
      });
    } catch (err) {
      return res.status(500).json({
        body: err,
      });
    }
  }
}
