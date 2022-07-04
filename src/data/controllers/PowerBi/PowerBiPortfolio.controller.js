import { ProjectService } from '../../services';

export class PowerBiPortfolioController {
  async handle(req, res) {
    try {
      const {
        page,
        limit,
        id_region,
        id_city,
        cd_priority,
        download,
        id_project,
      } = req.query;

      const service = new ProjectService();

      const response = await service.execute({
        page,
        limit,
        id_region,
        id_city,
        cd_priority,
        download,
        id_project,
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

      return res.status(200).json({
        count,
        page,
        limit,
        projects: rows,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
