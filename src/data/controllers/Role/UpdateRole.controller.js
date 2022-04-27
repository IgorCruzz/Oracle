import { UpdateRoleService } from '../../services';

export class UpdateRoleController {
  async handle(req, res) {
    try {
      const service = new UpdateRoleService();

      const { id_role } = req.params;

      const response = await service.execute(id_role, req.body);

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        role: response.role,
        message: response.message,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
