import { DeleteProjectService } from '../../services';

export class DeleteProjectController {
  async handle(req, res) {
    try {
      const service = new DeleteProjectService();
      const { id_project } = req.params;

      const response = await service.execute({ id_project });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  }
}
