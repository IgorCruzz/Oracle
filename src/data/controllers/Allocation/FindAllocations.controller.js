import { FindAllocationService } from '../../services';

export class FindAllocationsController {
  async handle(req, res) {
    try {
      const {
        page,
        limit,
        tp_action_picture,
        qt_hours_picture,
        vl_salary_picture,
        vl_hour_cost_foto,
        id_allocation_period,
        id_product,
        id_professional,
        id_role_picture,
        id_grade_picture,
        id_sector_picture,
      } = req.query;

      const service = new FindAllocationService();

      const response = await service.execute({
        page,
        limit,
        tp_action_picture,
        qt_hours_picture,
        vl_salary_picture,
        vl_hour_cost_foto,
        id_allocation_period,
        id_product,
        id_professional,
        id_role_picture,
        id_grade_picture,
        id_sector_picture,
      });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      const { count, rows } = response.allocations;

      return res.status(200).json({
        count,
        page,
        limit,
        allocations: rows,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
