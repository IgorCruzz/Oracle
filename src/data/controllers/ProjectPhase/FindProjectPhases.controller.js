import { FindProjectPhasesService } from '../../services';

export class FindProjectPhasesController {
  async handle(req, res) {
    try {
      const { page, limit, id_project, nm_project_phase } = req.query;

      const service = new FindProjectPhasesService();

      const response = await service.execute({
        page,
        limit,
        id_project,
        nm_project_phase,
      });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      const { count, rows } = response.projectPhases;

      return res.status(200).json({
        count,
        page,
        limit,
        projectPhases: rows,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
