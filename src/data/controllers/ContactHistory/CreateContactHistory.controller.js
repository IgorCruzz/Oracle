import { CreateContactHistoryService } from '../../services';

export class CreateContactHistoryController {
  async handle(req, res) {
    try {
      const service = new CreateContactHistoryService();

      const response = await service.execute(req.body);

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
        contactHistory: response.contactHistory,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
