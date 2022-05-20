import { DeleteAllocationPeriodService } from '../../services';

export class DeleteAllocationController {
  async handle(req, res) {
    try {
      const service = new DeleteAllocationPeriodService();
      const { id_allocation_period } = req.params;

      const response = await service.execute({ id_allocation_period });

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
