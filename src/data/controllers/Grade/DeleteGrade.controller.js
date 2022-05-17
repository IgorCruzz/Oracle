import { DeleteGradeService } from '../../services';

export class DeleteGradeController {
  async handle(req, res) {
    try {
      const service = new DeleteGradeService();
      const { id_grade } = req.params;

      const response = await service.execute({ id_grade });

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
