import { FindCategoryService } from '../../services';

export class FindDocumentController {
  async handle(req, res) {
    try {
      const { id_document } = req.params;

      const service = new FindCategoryService();

      const response = await service.execute({ id_document });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        document: response.document,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
