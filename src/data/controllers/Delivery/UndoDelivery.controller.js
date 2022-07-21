import { UndoDeliveryService } from '../../services';

export class UndoDeliveryController {
  async handle(req, res) {
    try {
      const service = new UndoDeliveryService();

      const response = await service.execute({ ...req.body, ...req.file });

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
