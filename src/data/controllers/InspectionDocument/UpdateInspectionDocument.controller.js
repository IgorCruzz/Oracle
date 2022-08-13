import { UpdateInspectionDocumentService } from '../../services';

export class UpdateInspectionDocumentController {
  async handle(req, res) {
    try {
      const service = new UpdateInspectionDocumentService();
      const { id_inspection_document } = req.params;

      const response = await service.execute(id_inspection_document, req);

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        inspection_document: response.inspection_document,
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
