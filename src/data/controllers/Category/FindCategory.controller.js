import { FindCategoryService } from '../../services';

export class FindCategoryController {
  async handle(req, res) {
    try {
      const { id } = req.params;

      const service = new FindCategoryService();

      const response = await service.execute({ id });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        category: response.category,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
