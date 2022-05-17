import { CreateProfessionalService } from '../../services';

export class CreateProfessionalController {
  async handle(req, res) {
    try {
      const service = new CreateProfessionalService();

      const response = await service.execute(req.body);

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
        professional: response.professional,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
