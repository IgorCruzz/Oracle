import { CreateProjectStatusService } from '../../services';

export class CreateProjectStatusController {
  async handle(req, res) {
    try {
      const service = new CreateProjectStatusService();

      const response = await service.execute({ ...req.body });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
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
