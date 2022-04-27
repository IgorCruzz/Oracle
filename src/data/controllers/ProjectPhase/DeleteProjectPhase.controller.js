import { DeleteProjectPhaseService } from '../../services';

export class DeleteProjectPhaseController {
  async handle(req, res) {
    try {
      const service = new DeleteProjectPhaseService();
      const { id_project_phase } = req.params;

      const response = await service.execute({ id_project_phase });

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