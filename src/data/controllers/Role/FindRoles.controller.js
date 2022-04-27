import { FindRolesService } from '../../services';

export class FindRolesController {
  async handle(req, res) {
    try {
      const service = new FindRolesService();

      const response = await service.execute();

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      const { rows } = response.roles;

      return res.status(200).json({
        roles: rows,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
