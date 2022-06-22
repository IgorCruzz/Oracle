import { FindMediaTimelapsesService } from '../../services';

export class FindMediaTimelapsesController {
  async handle(req, res) {
    try {
      const { page, limit, id, id_timelapse_coordinates } = req.query;

      const service = new FindMediaTimelapsesService();

      const response = await service.execute({
        page,
        limit,
        id,
        id_timelapse_coordinates,
      });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      const { count, rows } = response.media_timelapses;

      return res.status(200).json({
        count,
        page,
        limit,
        media_timelapses: rows,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
