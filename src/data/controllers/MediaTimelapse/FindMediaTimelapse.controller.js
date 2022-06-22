import { FindMediaTimelapseService } from '../../services';

export class FindMediaTimelapseController {
  async handle(req, res) {
    try {
      const { id_media_timelapse } = req.params;

      const service = new FindMediaTimelapseService();

      const response = await service.execute({ id_media_timelapse });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        media_timelapse: response.media_timelapse,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
