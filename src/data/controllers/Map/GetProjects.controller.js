import { GetProjectsService } from '../../services';

export class GetProjectsController {
  async handle(req, res) {
    try {
      const { nm_project, nm_city, id_category, tp_project_phase } = req.query;

      const service = new GetProjectsService();

      const response = await service.execute({
        nm_project,
        nm_city,
        id_category,
        tp_project_phase,
      });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        projects: response.projects,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
