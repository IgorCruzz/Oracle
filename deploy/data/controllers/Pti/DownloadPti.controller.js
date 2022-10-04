"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class DownloadPtiController {
  async handle(req, res) {
    try {
      const { id_allocation_period, id_professional } = req.query;

      const service = new (0, _services.DownloadPtiService)();

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

        res.setHeader('Content-Disposition', 'attachment; filename=pti.pdf');

        res.status(200).send(result);
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.DownloadPtiController = DownloadPtiController;
