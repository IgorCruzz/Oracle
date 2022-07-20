import { DeleteContactService } from '../../services';

export class DeleteContactController {
  async handle(req, res) {
    try {
      const service = new DeleteContactService();
      const { id_contact } = req.params;

      const response = await service.execute({ id_contact });

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
