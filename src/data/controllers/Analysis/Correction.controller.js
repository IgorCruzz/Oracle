import { CorrectionService } from '../../services';

export class CorrectionController {
  async handle(req, res) {
    try {
      const service = new CorrectionService();
      const { userId } = req;

      const { filename, size, mimetype, originalname } = req.file;

      const response = await service.execute(
        { ...req.body, filename, size, mimetype, originalname },
        userId
      );

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
