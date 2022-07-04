import { ReportPtiService } from '../../services';

export class ReportPtiController {
  async handle(req, res) {
    try {
      const { page, limit, id_allocation_period, download } = req.query;

      const service = new ReportPtiService();

      const response = await service.execute({
        page,
        limit,
        id_allocation_period,
        download,
      });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      const { count, rows, buffer } = response.ptis;

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
        ptis: rows,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
