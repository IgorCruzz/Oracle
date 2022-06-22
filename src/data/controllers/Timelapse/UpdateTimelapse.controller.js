import { UpdateTimelapseService } from '../../services';

export class UpdateTimelapseController {
  async handle(req, res) {
    try {
      const service = new UpdateTimelapseService();

      const { id_timelapse_coordinates } = req.params;

      const response = await service.execute(
        id_timelapse_coordinates,
        req.body
      );

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        timelapse: response.timelapse,
        message: response.message,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
