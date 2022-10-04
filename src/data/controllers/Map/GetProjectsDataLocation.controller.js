import { GetProjectsDataLocationService } from '../../services';

export class GetProjectsDataLocationController {
  async handle(req, res) {
    try {
      const { id_location } = req.query;

      const service = new GetProjectsDataLocationService();

      const response = await service.execute({
        id_location,
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
