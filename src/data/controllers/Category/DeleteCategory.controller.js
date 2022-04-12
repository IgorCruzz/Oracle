import { DeleteCategoryService } from '../../services';

export class DeleteCategoryController {
  async handle(req, res) {
    try {
      const service = new DeleteCategoryService();
      const { name } = req.params;

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
