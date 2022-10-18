import { DeletePhaseStatusService } from '../../services';

export class DeletePhaseStatusController {
  async handle(req, res) {
    try {
      const service = new DeletePhaseStatusService();
      const { id_status } = req.params;

      const response = await service.execute({ id_status });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
      });
    } catch (err) {
      console.log({ err });
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
