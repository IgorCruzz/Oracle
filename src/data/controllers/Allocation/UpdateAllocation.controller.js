import { UpdateAllocationService } from '../../services';

export class UpdateAllocationController {
  async handle(req, res) {
    try {
      const service = new UpdateAllocationService();

      const { id_allocation } = req.params;

      const response = await service.execute(id_allocation, req.body);

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        allocation: response.allocation,
        message: response.message,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
