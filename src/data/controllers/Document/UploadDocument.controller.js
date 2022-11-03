import { UploadDocumentService } from '../../services';

export class UploadDocumentController {
  async handle(req, res) {
    try {
      const service = new UploadDocumentService();

      const { id_document } = req.body;

      const { key, size, mimetype, originalname } = req.file;

      const response = await service.execute(id_document, {
        key,
        size,
        mimetype,
        originalname,
      });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
        document: response.document,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
