import { UpdateGradeService } from '../../services';

export class UpdateGradeController {
  async handle(req, res) {
    try {
      const service = new UpdateGradeService();

      const { id_grade } = req.params;

      const response = await service.execute(id_grade, req.body);

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        grade: response.grade,
        message: response.message,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
