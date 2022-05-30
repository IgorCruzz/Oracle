import { Router } from 'express';
import Pdf from 'pdfmake';

const routes = Router();

routes.post('/pdf', (req, res) => {
  const fonts = {
    Helvetica: {
      normal: 'Helvetica',
      bold: 'Helvetica-Bold',
      italics: 'Helvetica-Oblique',
      bolditalics: 'Helvetica-BoldOblique',
    },
  };
  const printer = new Pdf(fonts);

  const docDefinition = {
    defaultStyle: { font: 'Helvetica' },
    content: [
      {
        table: {
          body: [
            [
              { text: 'Texto', style: 'columnsTitle' },
              { text: 'Texto', style: 'columnsTitle' },
              { text: 'Texto', style: 'columnsTitle' },
              { text: 'Texto', style: 'columnsTitle' },
            ],
            ['text', 'text', 'text', 'text'],
          ],
        },
      },
    ],
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinition);

  const chunks = [];

  pdfDoc.on('data', chunk => {
    chunks.push(chunk);
  });
  pdfDoc.end();

  pdfDoc.on('end', () => {
    const result = Buffer.concat(chunks);
    res.end(result);
  });
});

export default routes;
