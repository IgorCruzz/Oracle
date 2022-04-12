import { CreateCategoryService } from '../../services';

export class CreateCategoryController {
  async handle(req, res) {
    try {
      const service = new CreateCategoryService();
      const { name } = req.body;

      const response = await service.execute({ name });

      if (response.error)
        return res.status(400).json({
          mensagem: response.error,
        });

      return res.status(200).json({
        mensagem: response.mensagem,
      });
    } catch (err) {
      return res.status(500).json({
        body: err,
      });
    }
  }
}
