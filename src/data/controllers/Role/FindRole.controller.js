import { FindRoleService } from '../../services';

export class FindRoleController {
  async handle(req, res) {
    try {
      const { id_role } = req.params;

      const service = new FindRoleService();

      const response = await service.execute({ id_role });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        role: response.role,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
