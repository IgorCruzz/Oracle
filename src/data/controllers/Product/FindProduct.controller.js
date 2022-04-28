import { FindProductService } from '../../services';

export class FindProductController {
  async handle(req, res) {
    try {
      const { id_product } = req.params;

      const service = new FindProductService();

      const response = await service.execute({ id_product });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        product: response.product,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
