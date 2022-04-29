import { FindUserService } from '../../services';

export class FindUserController {
  async handle(req, res) {
    try {
      const { id_user } = req.params;

      const service = new FindUserService();

      const response = await service.execute({ id_user });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        user: response.user,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
