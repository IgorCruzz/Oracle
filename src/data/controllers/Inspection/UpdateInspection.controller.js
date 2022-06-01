import { UpdateInspectionService } from '../../services';

export class UpdateInspectionController {
  async handle(req, res) {
    try {
      const service = new UpdateInspectionService();

      const { id_inspection } = req.params;

      const response = await service.execute(id_inspection, req.body);

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        inspection: response.inspection,
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
