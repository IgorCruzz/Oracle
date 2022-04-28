import { UpdateCategoryService } from '../../services';

export class UpdateDocumentController {
  async handle(req, res) {
    try {
      const service = new UpdateCategoryService();

      const { id_document } = req.params;

      const response = await service.execute(id_document, req.body);

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        category: response.category,
        message: response.message,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
