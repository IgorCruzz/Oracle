import { UpdateRoleGradeService } from '../../services';

export class UpdateRoleGradeController {
  async handle(req, res) {
    try {
      const service = new UpdateRoleGradeService();

      const { id_role_grade } = req.params;

      const response = await service.execute(id_role_grade, req.body);

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        roleGrade: response.roleGrade,
        message: response.message,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
