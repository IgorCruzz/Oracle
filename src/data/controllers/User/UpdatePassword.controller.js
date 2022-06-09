import { UpdatePasswordService } from '../../services';

export class UpdatePasswordController {
  async handle(req, res) {
    try {
      const service = new UpdatePasswordService();

      const { userId } = req;

      const response = await service.execute(userId, req.body);

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
