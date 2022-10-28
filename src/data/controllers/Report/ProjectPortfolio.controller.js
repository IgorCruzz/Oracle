import { ProjectPortfolioService } from '../../services';

export class ProjectPortfolioController {
  async handle(req, res) {
    try {
      const {
        page,
        limit,
        id_region,
        id_city,
        cd_priority,
        download,
        order_by,
        id_status,
      } = req.query;

      const service = new ProjectPortfolioService();

      const response = await service.execute({
        page,
        limit,
        id_region,
        id_city,
        cd_priority,
        download,
        order_by,
        id_status,
      });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      const { count, rows, buffer } = response.projects;

      if (buffer) {
        res.setHeader(
          'Content-Disposition',
          'attachment; filename=relatorio.xlsx'
        );

        return res.status(200).send(buffer);
      }

      let sortByNameCity;
      let sortByCdPriority;
      let sortByNameProject;

      if (order_by === 'nm_city') {
        sortByNameCity = rows.sort((a, b) => {
          if (a.nm_city < b.nm_city) {
            return -1;
          }
          if (a.nm_city > b.nm_city) {
            return 1;
          }
          return 0;
        });
      }

      if (order_by === 'cd_priority') {
        sortByCdPriority = rows.sort((a, b) => {
          if (a.cd_priority < b.cd_priority) {
            return -1;
          }
          if (a.cd_priority > b.cd_priority) {
            return 1;
          }
          return 0;
        });
      }

      if (order_by === 'nm_project') {
        sortByNameProject = rows.sort((a, b) => {
          if (a.nm_project < b.nm_project) {
            return -1;
          }
          if (a.nm_project > b.nm_project) {
            return 1;
          }
          return 0;
        });
      }

      return res.status(200).json({
        count,
        page,
        limit,
        projects:
          sortByNameCity || sortByNameProject || sortByCdPriority || rows,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
