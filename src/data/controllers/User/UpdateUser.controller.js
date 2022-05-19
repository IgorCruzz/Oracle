import { UpdateUserService } from '../../services';

export class UpdateUserController {
  async handle(req, res) {
    try {
      const service = new UpdateUserService();

      const { id_user } = req.params;

      const response = await service.execute(id_user, req.body);

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
        user: response.user,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
