import { GetProjectsCoordinatesFromCityService } from '../../services';

export class GetProjectsCoordinatesFromCityController {
  async handle(req, res) {
    try {
      const { id_city } = req.query;

      const service = new GetProjectsCoordinatesFromCityService();

      const response = await service.execute({
        id_city,
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
