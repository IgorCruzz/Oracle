import { FindProjectService } from '../../services';

export class FindProjectController {
  async handle(req, res) {
    try {
      const { id_project } = req.params;

      const service = new FindProjectService();

      const response = await service.execute({ id_project });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        project: response.project,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
