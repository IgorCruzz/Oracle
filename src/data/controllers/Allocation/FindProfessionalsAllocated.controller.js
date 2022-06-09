import { FindProfessionalsAllocatedService } from '../../services';

export class FindProfessionalsAllocatedController {
  async handle(req, res) {
    try {
      const service = new FindProfessionalsAllocatedService();

      const response = await service.execute();

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        professionals: response.professionals,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
