import { ReportContactService } from '../../services';

export class ReportContactController {
  async handle(req, res) {
    try {
      const {
        page,
        limit,
        download,
        dt_contatct,
        id_project,
        dt_feedback,
        no_feedback,
      } = req.query;

      const service = new ReportContactService();

      const response = await service.execute({
        page,
        limit,
        download,
        dt_contatct,
        id_project,
        dt_feedback,
        no_feedback,
      });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      const { count, rows, buffer } = response.contacts;

      if (buffer) {
        res.setHeader(
          'Content-Disposition',
          'attachment; filename=relatorio.xlsx'
        );

        return res.status(200).send(buffer);
      }

      return res.status(200).json({
        count,
        page,
        limit,
        contacts: rows,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
