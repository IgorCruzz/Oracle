import { CreateTechinalManagerService } from '../../services';

export class CreateTechinalManagerController {
  async handle(req, res) {
    try {
      const service = new CreateTechinalManagerService();

      const response = await service.execute(req.body);

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
        technicalManager: response.technicalManager,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
