import { DownloadInspectionDocumentService } from '../../services';

export class DownloadInspectionDocumentController {
  async handle(req, res) {
    try {
      const { nm_file } = req.params;
      const service = new DownloadInspectionDocumentService();

      const response = await service.execute({ nm_file });

      const { file, nm_original_file } = response;

      return res.download(file, nm_original_file);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
