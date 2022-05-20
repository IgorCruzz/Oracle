import { CreateAllocationService } from '../../services';

export class CreateAllocationController {
  async handle(req, res) {
    try {
      const service = new CreateAllocationService();

      const response = await service.execute(req.body);

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
        allocation: response.allocation,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
