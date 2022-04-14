import { FindProgramService } from '../../services';

export class FindProgramController {
  async handle(req, res) {
    try {
      const { id } = req.params;

      const service = new FindProgramService();

      const response = await service.execute({ id });

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
