import { DownloadPtiService } from '../../services';

export class DownloadPtiController {
  async handle(req, res) {
    try {
      const { id_allocation_period, id_professional } = req.query;

      const service = new DownloadPtiService();

      const response = await service.execute({
        id_allocation_period,
        id_professional,
      });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      const { pdfDoc, chunks } = response;

      pdfDoc.on('data', chunk => {
        chunks.push(chunk);
      });

      pdfDoc.end();

      pdfDoc.on('end', () => {
        const result = Buffer.concat(chunks);

        //res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');

        res.contentType('application/pdf').send(result);
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
