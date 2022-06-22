import { DownloadMediaTimelapseService } from '../../services';

export class DownloadMediaTimelapseController {
  async handle(req, res) {
    try {
      const id_media_timelapse = req.params.id_media_timelapse;
      const service = new DownloadMediaTimelapseService();

			const response = await service.execute({ id_media_timelapse, res, req });

			return response;

		} catch (err) {
			console.log(err);
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
