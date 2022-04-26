import { DeleteTechnicalManagerService } from '../../services';

export class DeleteTechnicalManagerController {
  async handle(req, res) {
    try {
      const service = new DeleteTechnicalManagerService();
      const { id_technical_manager } = req.params;

      const response = await service.execute({ id_technical_manager });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}