import { FindProjectStatusService } from '../../services';

export class FindProjectStatusController {
  async handle(req, res) {
    try {
      const { id_status } = req.params;

      const service = new FindProjectStatusService();

      const response = await service.execute({ id_status });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        status: response.status,
      });
    } catch (err) {
      console.log({ err });
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
