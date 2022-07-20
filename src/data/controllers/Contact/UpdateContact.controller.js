import { UpdateContactService } from '../../services';

export class UpdateContactController {
  async handle(req, res) {
    try {
      const service = new UpdateContactService();

      const { id_contact } = req.params;

      const response = await service.execute(id_contact, req.body);

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      return res.status(200).json({
        message: response.message,
        contact: response.contact,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
