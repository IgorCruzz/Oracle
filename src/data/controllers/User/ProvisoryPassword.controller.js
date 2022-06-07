import { ProvisoryPasswordService } from '../../services';

export class ProvisoryPasswordController {
  async handle(req, res) {
    try {
      const service = new ProvisoryPasswordService();

      const { id_user } = req.params;

      const response = await service.execute({ id_user });

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
