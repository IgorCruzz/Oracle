import { CreateRoleGradeService } from '../../services';

export class CreateRoleGradeController {
  async handle(req, res) {
    try {
      const service = new CreateRoleGradeService();

      const response = await service.execute(req.body);

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
        coustHH: response.coustHH,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
