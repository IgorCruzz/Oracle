import { FindAllocationPeriodService } from '../../services';

export class FindAllocationController {
  async handle(req, res) {
    try {
      const { id_allocation_period } = req.params;

      const service = new FindAllocationPeriodService();

      const response = await service.execute({ id_allocation_period });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        allocationPeriod: response.allocationPeriod,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
