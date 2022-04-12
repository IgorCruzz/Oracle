import { CreateCategoryService } from '../../services';

export class CreateCategoryController {
  async handle(req, res) {
    try {
      const service = new CreateCategoryService();
      const { name } = req.body;

      const response = await service.execute({ name });

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
