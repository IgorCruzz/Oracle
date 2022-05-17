import { DeleteProfessionalService } from '../../services';

export class DeleteProfessionalController {
  async handle(req, res) {
    try {
      const service = new DeleteProfessionalService();
      const { id_professional } = req.params;

      const response = await service.execute({ id_professional });

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
