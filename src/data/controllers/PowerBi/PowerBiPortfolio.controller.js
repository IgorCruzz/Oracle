import { PowerBiPortfolioService } from '../../services';

export class PowerBiPortfolioController {
  async handle(req, res) {
    try {
      const service = new PowerBiPortfolioService();

      const response = await service.execute();

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        projects: response.projects,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
