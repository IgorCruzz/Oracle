import { CreateProductHistoryService } from '../../services';

export class CreateProductHistoryController {
  async handle(req, res) {
    try {
      const service = new CreateProductHistoryService();

      const response = await service.execute(req.body);

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
        productHistory: response.productHistory,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
