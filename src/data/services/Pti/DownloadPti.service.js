import Pdf from 'pdfmake';
import { resolve } from 'path';
import { format } from 'date-fns';
import {
  Allocation,
  Allocation_period,
  Product,
  Professional,
  Project_phase,
  Project,
  City,
} from '../../database/models';

export class DownloadPtiService {
  async execute({ id_allocation_period, id_professional }) {
    const getProfessional = await Professional.findOne({
      where: {
        id_professional,
      },
    });

    const getAllocationPeriod = await Allocation_period.findOne({
      where: {
        id_allocation_period,
      },
    });

    const {
      dt_start_allocation,
      dt_end_allocation,
      qt_business_hours,
    } = getAllocationPeriod;

    const period = `${format(
      new Date(dt_start_allocation),
      'dd/MM/yyyy'
    )} - ${format(
      new Date(dt_end_allocation),
      'dd/MM/yyyy'
    )} (${qt_business_hours}h)`;

    const { nm_professional } = getProfessional;

    const project = await Project.findAll({
      include: [
        {
          model: City,
          as: 'city',
        },
        {
          model: Project_phase,
          as: 'project_phase',
          required: true,
          include: [
            {
              model: Product,
              as: 'product',
              required: true,
              include: [
                {
                  model: Allocation,
                  as: 'allocation',
                  required: true,
                  include: [
                    {
                      model: Professional,
                      as: 'professional',
                      required: true,
                      where: { id_professional },
                    },
                    {
                      model: Allocation_period,
                      as: 'allocation_period',
                      required: true,
                      where: { id_allocation_period },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    const borderColor = ['#ffffff', '#ffffff', '#ffffff', '#ffffff'];

    const values = project.map(proj => {
      const products = proj.dataValues.project_phase
        .map(val => val.dataValues.product)
        .map(kok => kok.map(a => a.dataValues));

      const arr = [];

      products.map(a =>
        a.map(b => {
          arr.push(b);
        })
      );

      return [
        { text: proj.dataValues.city.nm_city, style: 'values', borderColor },
        { text: proj.dataValues.nm_project, style: 'values', borderColor },
        {
          text: arr.map(a => `${a.nm_product}\n\n\n`),
          style: 'values',
          borderColor,
        },
        {
          text: arr.map(
            a =>
              (a.allocation[0].dataValues.tp_action_picture === 0 &&
                'Não Definida\n\n\n') ||
              (a.allocation[0].dataValues.tp_action_picture === 1 &&
                'Produção Integral\n\n\n') ||
              (a.allocation[0].dataValues.tp_action_picture === 2 &&
                'Produção Parcial\n\n\n') ||
              (a.allocation[0].dataValues.tp_action_picture === 3 &&
                'Dispensado\n\n\n') ||
              (a.allocation[0].dataValues.tp_action_picture === 4 &&
                'Concluído pelo demandante\n\n\n')
          ),
          style: 'values',
          borderColor,
        },
        {
          text: arr.map(
            a => `${String(a.allocation[0].dataValues.qt_hours_picture)}\n\n\n`
          ),
          style: 'lastColumnValue',
          borderColor,
        },
      ];
    });

    const [total] = project.map(proj => {
      const products = proj.dataValues.project_phase
        .map(val => val.dataValues.product)
        .map(kok => kok.map(a => a.dataValues));

      const arr = [];

      products.map(a =>
        a.map(b => {
          arr.push(b);
        })
      );

      return arr.map(a => a.allocation[0].dataValues.qt_hours_picture);
    });

    const sum = total.reduce((a, b) => a + b, 0);

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
      pageOrientation: 'landscape',
      pageMargins: [20, 20, 20, 20],
      defaultStyle: { font: 'Helvetica' },

      content: [
        {
          columns: [
            {
              image: resolve(
                __dirname,
                '..',
                '..',
                '..',
                'utils',
                'img',
                'ieea.png'
              ),
              width: 70,
              height: 20,
              margin: [0, 30, 20, 5],
            },

            {
              image: resolve(
                __dirname,
                '..',
                '..',
                '..',
                'utils',
                'img',
                'logo.png'
              ),
              width: 100,
              height: 50,
              margin: [0, 5, 20, 5],
            },

            {
              image: resolve(
                __dirname,
                '..',
                '..',
                '..',
                'utils',
                'img',
                'rj.png'
              ),
              width: 100,
              height: 50,
              margin: [0, 5, 20, 5],
            },
            {
              image: resolve(
                __dirname,
                '..',
                '..',
                '..',
                'utils',
                'img',
                'puc.jpg'
              ),
              width: 70,
              height: 50,
              margin: [0, 5, 20, 5],
            },
            {
              image: resolve(
                __dirname,
                '..',
                '..',
                '..',
                'utils',
                'img',
                'puc.jpg'
              ),
              width: 70,
              height: 50,
              margin: [0, 5, 20, 5],
            },
          ],
        },
        {
          text: 'divider',
          style: 'blank',
        },

        {
          table: {
            widths: ['20%', '20%', '60%'],
            body: [
              [
                {
                  text: 'Nome do Profissional',
                  style: 'columnsTitle',
                  borderColor: ['#B0C4DE', '#B0C4DE', '#B0C4DE', '#B0C4DE'],
                  bold: true,
                },
                {
                  text: nm_professional,
                  style: 'columnsTitle',
                  borderColor: ['#B0C4DE', '#B0C4DE', '#B0C4DE', '#B0C4DE'],
                  bold: true,
                },
                {
                  text: `Periodo ${period}`,
                  style: 'teste',
                  borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
                  bold: true,
                },
              ],
            ],
          },
        },
        {
          text: 'divider',
          style: 'blank',
        },
        {
          table: {
            widths: ['10%', '32%', '40%', '10%', '8%'],
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
                  text: 'DURAÇÃO (HH)',
                  style: 'total',
                  borderColor: ['#B0C4DE', '#B0C4DE', '#B0C4DE', '#B0C4DE'],
                  bold: true,
                },
              ],
              ...values,
            ],
          },
        },
        {
          table: {
            widths: ['90%', '10%'],
            body: [
              [
                {
                  text: 'TOTAL',
                  style: 'columnsTitle',
                  borderColor: ['#B0C4DE', '#B0C4DE', '#B0C4DE', '#B0C4DE'],
                  bold: true,
                },
                {
                  text: sum,
                  style: 'total',
                  borderColor: ['#B0C4DE', '#B0C4DE', '#B0C4DE', '#B0C4DE'],
                  bold: true,
                },
              ],
            ],
          },
        },
        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 30,
              x2: 450,
              y2: 30,
              lineWidth: 1,
            },
          ],
        },
        {
          text: 'Responsável pelo Plano de Trabalho Kerolaine Lemos Leal',
          style: 'signatureText',
          margin: [0, 5, 20, 5],
        },
        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 30,
              x2: 450,
              y2: 30,
              lineWidth: 1,
            },
          ],
        },
        {
          text: 'Coordenador do Projeto Vinicius Loback',
          style: 'signatureText',
          margin: [0, 5, 20, 5],
        },
        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 30,
              x2: 450,
              y2: 30,
              lineWidth: 1,
            },
          ],
        },
        {
          text: 'Presidente do IEEA Marcus Muffareng',
          style: 'signatureText',
          margin: [0, 5, 20, 5],
        },
      ],

      styles: {
        blank: {
          color: '#ffffff',
        },
        signatureText: {
          fontSize: 8,
        },
        teste: {
          alignment: 'right',
          fontSize: 8,
        },
        lastColumnValue: {
          alignment: 'right',
          fontSize: 8,
        },
        total: {
          fillColor: '#B0C4DE',
          alignment: 'right',
          fontSize: 8,
        },
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

    return {
      chunks,
      pdfDoc,
    };
  }
}
