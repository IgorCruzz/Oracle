import { PowerBiInspectionService } from '../../services';

export class PowerBiInspectionController {
  async handle(req, res) {
    try {
      const service = new PowerBiInspectionService();

      const response = await service.execute();

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        inspections: response.inspections,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
