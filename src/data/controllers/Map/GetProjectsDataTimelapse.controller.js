import { GetProjectsDataTimelapseService } from '../../services';

export class GetProjectsDataTimelapseController {
  async handle(req, res) {
    try {
      const { id_timelapse_coordinates } = req.query;

      const service = new GetProjectsDataTimelapseService();

      const response = await service.execute({
        id_timelapse_coordinates,
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
