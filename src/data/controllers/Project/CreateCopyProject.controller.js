import { CreateCopyProjectService } from '../../services';

export class CreateCopyProjectController {
  async handle(req, res) {
    try {
      const service = new CreateCopyProjectService();
      const { id_project } = req.params;

      const response = await service.execute(id_project, req.body);

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
        project: response.project,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error:
          'Não foi possível realizar a cópia do projeto. Por favor, tente mais tarde.',
      });
    }
  }
}
