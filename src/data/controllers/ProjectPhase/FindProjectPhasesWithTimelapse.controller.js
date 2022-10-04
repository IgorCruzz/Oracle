import { FindProjectPhasesWithTimelapseService } from '../../services';

export class FindProjectPhasesWithTimelapseController {
  async handle(req, res) {
    try {
      const { id_project } = req.params;

      const service = new FindProjectPhasesWithTimelapseService();

      const response = await service.execute({
        id_project,
      });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        projectPhases: response.projectPhases,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
