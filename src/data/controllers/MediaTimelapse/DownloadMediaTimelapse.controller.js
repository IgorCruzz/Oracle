import { DownloadMediaTimelapseService } from '../../services';

export class DownloadMediaTimelapseController {
  async handle(req, res) {
    try {
      const { nm_file } = req.params;
      const service = new DownloadMediaTimelapseService();

      const response = await service.execute({ nm_file, req, res });

      return response;
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
