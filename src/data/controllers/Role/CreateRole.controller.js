import { CreateRoleService } from '../../services';

export class CreateRoleController {
  async handle(req, res) {
    try {
      const service = new CreateRoleService();

      const response = await service.execute(req.body);

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
        role: response.role,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
