import { DownloadInspectionDocumentService } from '../../services';

export class DownloadInspectionDocumentController {
  async handle(req, res) {
    try {
      const nm_file = req.params.nm_file;
      const service = new DownloadInspectionDocumentService();

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
