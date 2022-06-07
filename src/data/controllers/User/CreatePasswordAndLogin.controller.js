import { CreatePasswordAndLoginService } from '../../services';

export class CreatePasswordAndLoginController {
  async handle(req, res) {
    try {
      const service = new CreatePasswordAndLoginService();

      const response = await service.execute(req.body);

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
        access_token: response.access_token,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
