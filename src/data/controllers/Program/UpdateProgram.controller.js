import { UpdateProgramService } from '../../services';

export class UpdateProgramController {
  async handle(req, res) {
    try {
      const service = new UpdateProgramService();

      const { id } = req.params;
      const { name } = req.body;

      const response = await service.execute({ name, id });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        program: response.program,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  }
}
