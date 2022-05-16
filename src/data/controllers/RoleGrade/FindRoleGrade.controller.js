import { FindRoleGradeService } from '../../services';

export class FindRoleGradeController {
  async handle(req, res) {
    try {
      const { id_role_grade } = req.params;

      const service = new FindRoleGradeService();

      const response = await service.execute({ id_role_grade });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        roleGrade: response.roleGrade,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
