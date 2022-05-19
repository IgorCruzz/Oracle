import { FindUsersService } from '../../services';

export class FindUsersController {
  async handle(req, res) {
    try {
      const {
        limit,
        page,
        ds_email_login,
        nm_user,
        tp_profile,
        in_active,
      } = req.query;

      const service = new FindUsersService();

      const response = await service.execute({
        limit,
        page,
        ds_email_login,
        nm_user,
        tp_profile,
        in_active,
      });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        users: response.users,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
