import { FindAllocationsService } from '../../services';

export class FindAllocationsController {
  async handle(req, res) {
    try {
      const {
        page,
        limit,
        cd_priority,
        id_project,
        id_project_phase,
        nm_product,
        id_suggested_role,
        id_professional,
        dt_start_allocation,
        dt_end_allocation,
        ag_alocation,
        on_production,
        in_correction,
        in_analisys,
        in_analisysCorretion,
        concluded,
      } = req.query;

      const service = new FindAllocationsService();

      const response = await service.execute({
        page,
        limit,
        cd_priority,
        id_project,
        id_project_phase,
        nm_product,
        id_suggested_role,
        id_professional,
        dt_start_allocation,
        dt_end_allocation,
        ag_alocation,
        on_production,
        in_correction,
        in_analisys,
        in_analisysCorretion,
        concluded,
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
