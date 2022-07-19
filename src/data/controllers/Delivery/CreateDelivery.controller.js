import { CreateDeliveryService } from '../../services';

export class CreateDeliveryController {
  async handle(req, res) {
    try {
      const service = new CreateDeliveryService();
      const { filename, size, mimetype, originalname } = req.file;

      const response = await service.execute({
        ...req.body,
        filename,
        size,
        mimetype,
        originalname,
      });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
        result: response.result,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
