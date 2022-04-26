import { FindTechnicalManagerService } from '../../services';

export class FindTechnicalManagerController {
  async handle(req, res) {
    try {
      const { id_technical_manager } = req.params;

      const service = new FindTechnicalManagerService();

      const response = await service.execute({ id_technical_manager });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        technicalManager: response.technicalManager,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
