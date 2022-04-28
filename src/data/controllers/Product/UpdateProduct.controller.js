import { UpdateProductService } from '../../services';

export class UpdateProductController {
  async handle(req, res) {
    try {
      const service = new UpdateProductService();

      const { id_product } = req.params;

      const response = await service.execute(id_product, req.body);

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        product: response.product,
        message: response.message,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
