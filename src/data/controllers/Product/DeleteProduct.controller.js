import { DeleteProductService } from '../../services';

export class DeleteProductController {
  async handle(req, res) {
    try {
      const service = new DeleteProductService();
      const { id_product } = req.params;

      const response = await service.execute({ id_product });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
