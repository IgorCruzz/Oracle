import { FindTechnicalManagersService } from '../../services';

export class FindTechnicalManagersController {
  async handle(req, res) {
    try {
      const {
        page,
        limit,
        id_project,
        nm_project,
        nu_crea,
        tp_responsability,
      } = req.query;

      const service = new FindTechnicalManagersService();

      const response = await service.execute({
        page,
        limit,
        id_project,
        nm_project,
        nu_crea,
        tp_responsability,
      });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      const { count, rows } = response.technicalManagers;

      return res.status(200).json({
        count,
        page,
        limit,
        technicalManagers: rows,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
