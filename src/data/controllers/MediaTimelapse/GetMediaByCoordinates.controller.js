import { GetMediaByCoordinatesService } from '../../services';

export class GetMediaByCoordinatesController {
  async handle(req, res) {
    try {
      const { id_timelapse_coordinates } = req.params;

      const service = new GetMediaByCoordinatesService();

      const response = await service.execute({
        id_timelapse_coordinates,
      });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        projectPhases: response.projectPhases,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
