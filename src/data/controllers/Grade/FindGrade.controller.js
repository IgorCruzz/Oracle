import { FindGradeService } from '../../services';

export class FindGradeController {
  async handle(req, res) {
    try {
      const { id_grade } = req.params;

      const service = new FindGradeService();

      const response = await service.execute({ id_grade });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        grade: response.grade,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
