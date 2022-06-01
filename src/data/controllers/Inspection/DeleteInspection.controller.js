import { DeleteInspectionService } from '../../services';

export class DeleteInspectionController {
  async handle(req, res) {
    try {
      const service = new DeleteInspectionService();
      const { id_inspection } = req.params;

      const response = await service.execute({ id_inspection });

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
