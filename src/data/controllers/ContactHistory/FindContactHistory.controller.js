import { FindContactHistoryService } from '../../services';

export class FindContactHistoryController {
  async handle(req, res) {
    try {
      const { id_contact_history } = req.params;

      const service = new FindContactHistoryService();

      const response = await service.execute({ id_contact_history });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
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
