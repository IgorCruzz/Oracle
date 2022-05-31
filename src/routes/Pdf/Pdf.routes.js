import { Router } from 'express';
import Pdf from 'pdfmake';

const routes = Router();

routes.get('/pdf', (req, res) => {
  const fonts = {
    Helvetica: {
      normal: 'Helvetica',
      bold: 'Helvetica-Bold',
      italics: 'Helvetica-Oblique',
      bolditalics: 'Helvetica-BoldOblique',
    },
  };
  const printer = new Pdf(fonts);

  const borderColor = ['#ffffff', '#ffffff', '#ffffff', '#ffffff'];

  const docDefinition = {
    pageOrientation: 'landscape',
    pageMargins: [20, 20, 20, 20],
    defaultStyle: { font: 'Helvetica' },
    content: [
      {
        table: {
          widths: ['20%', '20%', '20%', '20%', '20%'],
          body: [
            [
              {
                text: 'MUNICÍPIO',
                style: 'columnsTitle',
                borderColor: ['#B0C4DE', '#B0C4DE', '#B0C4DE', '#B0C4DE'],
                bold: true,
              },
              {
                text: 'PROJETO',
                style: 'columnsTitle',
                borderColor: ['#B0C4DE', '#B0C4DE', '#B0C4DE', '#B0C4DE'],
                bold: true,
              },
              {
                text: 'PRODUTO',
                style: 'columnsTitle',
                borderColor: ['#B0C4DE', '#B0C4DE', '#B0C4DE', '#B0C4DE'],
                bold: true,
              },
              {
                text: 'AÇÃO NECESSÁRIA',
                style: 'columnsTitle',
                borderColor: ['#B0C4DE', '#B0C4DE', '#B0C4DE', '#B0C4DE'],
                bold: true,
              },
              {
                text: 'Soma de DURAÇÃO DA ATIVIDADE',
                style: 'columnsTitle',
                borderColor: ['#B0C4DE', '#B0C4DE', '#B0C4DE', '#B0C4DE'],
                bold: true,
              },
            ],
            [
              { text: 'PROJETO', style: 'values', borderColor },
              { text: 'PROJETO', style: 'values', borderColor },
              { text: 'PROJETO', style: 'values', borderColor },
              { text: 'PROJETO', style: 'values', borderColor },
              { text: 'PROJETO', style: 'values', borderColor },
            ],
            [
              { text: 'PROJETO', style: 'values', borderColor },
              { text: 'PROJETO', style: 'values', borderColor },
              { text: 'PROJETO', style: 'values', borderColor },
              { text: 'PROJETO', style: 'values', borderColor },
              { text: 'PROJETO', style: 'values', borderColor },
            ],
            [
              { text: 'PROJETO', style: 'values', borderColor },
              { text: 'PROJETO', style: 'values', borderColor },
              { text: 'PROJETO', style: 'values', borderColor },
              { text: 'PROJETO', style: 'values', borderColor },
              { text: 'PROJETO', style: 'values', borderColor },
            ],
            [
              { text: 'PROJETO', style: 'values', borderColor },
              { text: 'PROJETO', style: 'values', borderColor },
              { text: 'PROJETO', style: 'values', borderColor },
              { text: 'PROJETO', style: 'values', borderColor },
              { text: 'PROJETO', style: 'values', borderColor },
            ],
            [
              { text: 'PROJETO', style: 'values', borderColor },
              { text: 'PROJETO', style: 'values', borderColor },
              { text: 'PROJETO', style: 'values', borderColor },
              { text: 'PROJETO', style: 'values', borderColor },
              { text: 'PROJETO', style: 'values', borderColor },
            ],
          ],
        },
      },
      {
        columns: [
          {
            width: 'auto',
            text: 'First column',
            fontSize: 30,
            fillColor: '#dedede',
          },
          {
            width: '95%',
            text: 'Total',
          },
          {
            width: '10%',
            text: '80',
          },
        ],
      },
    ],
    styles: {
      columnsTitle: {
        fillColor: '#B0C4DE',
        alignment: 'left',
        fontSize: 8,
      },
      values: {
        alignment: 'left',
        fontSize: 8,
      },
      defaultStyle: {
        columnGap: 0,
      },
    },
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
