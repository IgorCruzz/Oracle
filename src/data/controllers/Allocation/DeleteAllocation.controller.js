import { DeleteAllocationService } from '../../services';

export class DeleteAllocationController {
  async handle(req, res) {
    try {
      const service = new DeleteAllocationService();
      const { id_allocation } = req.params;

      const response = await service.execute({ id_allocation });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
