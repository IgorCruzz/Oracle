import { FindProjectsService } from '../../services';

export class FindProjectsController {
  async handle(req, res) {
    try {
      const {
        page,
        limit,
        id_city,
        id_category,
        id_program,
        id_agency,
        cd_sei,
        nm_project,
        id_status,
        no_status,
      } = req.query;

      const service = new FindProjectsService();

      const response = await service.execute({
        page,
        limit,
        id_city,
        id_category,
        id_program,
        id_agency,
        cd_sei,
        nm_project,
        id_status,
        no_status,
      });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      const { count, rows } = response.projects;

      return res.status(200).json({
        count,
        page,
        limit,
        projects: rows,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
