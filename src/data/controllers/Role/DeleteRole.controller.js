import { DeleteRoleService } from '../../services';

export class DeleteRoleController {
  async handle(req, res) {
    try {
      const service = new DeleteRoleService();
      const { id_role } = req.params;

      const response = await service.execute({ id_role });

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
