import { CreateAgencyService } from '../../services';

export class CreateProjectPhaseController {
  async handle(req, res) {
    try {
      const service = new CreateAgencyService();

      const response = await service.execute(req.body);

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
        projectPhase: response.projectPhase,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
