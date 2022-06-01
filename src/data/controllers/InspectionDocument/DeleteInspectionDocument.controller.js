import { DeleteInspectionDocumentService } from '../../services';

export class DeleteInspectionDocumentController {
  async handle(req, res) {
    try {
      const service = new DeleteInspectionDocumentService();
      const { id_inspection_document } = req.params;

      const response = await service.execute({ id_inspection_document });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
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
