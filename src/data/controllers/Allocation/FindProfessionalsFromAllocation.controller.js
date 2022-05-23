import { FindProfessionalsFromAllocationService } from '../../services';

export class FindProfessionalsFromAllocationController {
  async handle(req, res) {
    try {
      const {
        page,
        limit,
        cd_priority,
        id_project,
        id_project_phase,
        nm_product,
        tp_profile,
        id_professional,
        allocation_period,
      } = req.query;

      const service = new FindProfessionalsFromAllocationService();

      const response = await service.execute({
        page,
        limit,
        cd_priority,
        id_project,
        id_project_phase,
        nm_product,
        tp_profile,
        id_professional,
        allocation_period,
      });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      const { count, rows } = response.professionals;

      return res.status(200).json({
        count,
        page,
        limit,
        professionals: rows,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
