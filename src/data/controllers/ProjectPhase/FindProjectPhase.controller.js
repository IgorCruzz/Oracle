import { FindAgencyService } from '../../services';

export class FindProjectPhaseController {
  async handle(req, res) {
    try {
      const { id_project_phase } = req.params;

      const service = new FindAgencyService();

      const response = await service.execute({ id_project_phase });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        projectPhase: response.projectPhase,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
