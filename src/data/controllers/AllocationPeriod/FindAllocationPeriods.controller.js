import { FindAllocationPeriodsService } from '../../services';

export class FindAllocationPeriodsController {
  async handle(req, res) {
    try {
      const {
        page,
        limit,
        dt_start_allocation_in,
        dt_start_allocation_at,
        dt_end_allocation_in,
        dt_end_allocation_at,
        qt_business_hours,
      } = req.query;

      const service = new FindAllocationPeriodsService();

      const response = await service.execute({
        page,
        limit,
        dt_start_allocation_in,
        dt_start_allocation_at,
        dt_end_allocation_in,
        dt_end_allocation_at,
        qt_business_hours,
      });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      const { count, rows } = response.allocationPeriods;

      return res.status(200).json({
        count,
        page,
        limit,
        allocationPeriods: rows,
      });
    } catch (err) {
      console.log(err);

      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
