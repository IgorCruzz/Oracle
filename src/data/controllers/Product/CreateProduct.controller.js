import { CreateProductService } from '../../services';

export class CreateProductController {
  async handle(req, res) {
    try {
      const service = new CreateProductService();

      const response = await service.execute(req.body);

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
        product: response.product,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
