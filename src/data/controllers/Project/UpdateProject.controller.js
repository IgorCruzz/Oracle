import { UpdateProjectService } from '../../services';

export class UpdateProjectController {
  async handle(req, res) {
    try {
      const service = new UpdateProjectService();

      const { id_project } = req.params;

      const response = await service.execute(id_project, req.body);

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        project: response.project,
        message: response.message,
      });
    } catch (err) {
      console.log({ err });
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
