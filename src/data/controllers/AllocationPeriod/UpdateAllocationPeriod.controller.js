import { UpdateAllocationPeriodService } from '../../services';

export class UpdateAllocationPeriodController {
  async handle(req, res) {
    try {
      const service = new UpdateAllocationPeriodService();

      const { id_allocation_period } = req.params;

      const response = await service.execute(id_allocation_period, req.body);

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        allocationPeriod: response.allocationPeriod,
        message: response.message,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
