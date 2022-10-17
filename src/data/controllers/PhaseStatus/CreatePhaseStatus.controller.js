import { CreatePhaseStatusService } from '../../services';

export class CreatePhaseStatusController {
  async handle(req, res) {
    try {
      const service = new CreatePhaseStatusService();
      const { ds_status } = req.body;

      const response = await service.execute({ ds_status });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
        status: response.status,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
