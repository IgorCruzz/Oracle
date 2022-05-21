import { FindProfessionalPtiService } from '../../services';

export class FindProfessionalPtiController {
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

      const service = new FindProfessionalPtiService();

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
