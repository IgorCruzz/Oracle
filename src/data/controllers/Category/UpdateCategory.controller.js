import { UpdateCategoryService } from '../../services';

export class UpdateCategoryController {
  async handle(req, res) {
    try {
      const service = new UpdateCategoryService();

      const { id } = req.params;
      const { name } = req.body;

      const response = await service.execute({ name, id });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        category: response.category,
        message: response.message,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  }
}
