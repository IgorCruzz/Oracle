import { CreateInspectionDocumentService } from '../../services';

export class CreateInspectionDocumentController {
  async handle(req, res) {
    try {
      const service = new CreateInspectionDocumentService();
      const response = await service.execute(req);

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
        inspection_document: response.inspection_document,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
