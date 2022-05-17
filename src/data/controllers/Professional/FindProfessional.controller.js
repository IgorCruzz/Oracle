import { FindProfessionalService } from '../../services';

export class FindProfessionalController {
  async handle(req, res) {
    try {
      const { id_professional } = req.params;

      const service = new FindProfessionalService();

      const response = await service.execute({ id_professional });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        professional: response.professional,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
