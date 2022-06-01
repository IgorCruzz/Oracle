import Pdf from 'pdfmake';
import { resolve } from 'path';
import {
  Allocation,
  Allocation_period,
  Product,
  Professional,
  Role,
  Grade,
  Sector,
  Project_phase,
  Project,
  User,
  Product_history,
  City,
} from '../../database/models';

export class DownloadPtiService {
  async execute({ id_allocation_period, id_professional }) {
    const findAllocations = await Allocation.findAll({
      where: {
        id_professional,
      },
      include: [
        {
          model: Allocation_period,
          as: 'allocation_period',
          where: { id_allocation_period },
        },
        {
          model: Product,
          as: 'product',

          include: [
            {
              model: Product_history,
              as: 'product_history',
            },
            {
              model: Project_phase,
              as: 'project_phase',

              include: [
                {
                  model: Project,
                  as: 'project',
                  include: [
                    {
                      model: City,
                      as: 'city',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          model: Professional,
          as: 'professional',

          include: [
            {
              model: User,
              as: 'user',
              attributes: [
                'id_user',
                'ds_email_login',
                'nm_user',
                'dt_created_at',
                'dt_updated_at',
                'tp_profile',
                'in_active',
              ],
            },
          ],
        },
        { model: Role, as: 'role' },
        { model: Grade, as: 'grade' },
        { model: Sector, as: 'sector' },
      ],
    });

    const getAllocations = findAllocations.map(allocation => {
      const all = allocation.dataValues;

      return {
        city:
          all.product.project_phase.dataValues.project.dataValues.city
            .dataValues.nm_city,
        project:
          all.product.project_phase.dataValues.project.dataValues.nm_project,
        professional: all.professional.dataValues,
        products: all.product.dataValues,
        tp_action_picture: all.tp_action_picture,
        qt_hours_picture: all.qt_hours_picture,
      };
    });

    const { professional } = getAllocations[0];

    const borderColor = ['#ffffff', '#ffffff', '#ffffff', '#ffffff'];

    const values = getAllocations.map(teste => [
      { text: teste.city, style: 'values', borderColor },
      { text: teste.project, style: 'values', borderColor },
      { text: teste.products.nm_product, style: 'values', borderColor },
      {
        text:
          (teste.tp_action_picture === 0 && 'Não Definida') ||
          (teste.tp_action_picture === 1 && 'Produção Integral') ||
          (teste.tp_action_picture === 2 && 'Produção Parcial') ||
          (teste.tp_action_picture === 3 && 'Dispensado') ||
          (teste.tp_action_picture === 4 && 'Concluído pelo demandante'),
        style: 'values',
        borderColor,
      },
      { text: teste.qt_hours_picture, style: 'lastColumnValue', borderColor },
    ]);

    const [total] = getAllocations.map((a, b) => a.qt_hours_picture + b, 0);

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
                  text: professional.nm_professional,
                  style: 'columnsTitle',
                  borderColor: ['#B0C4DE', '#B0C4DE', '#B0C4DE', '#B0C4DE'],
                  bold: true,
                },
                {
                  text: 'Periodo 31/01/2022 a 11/02/2022',
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
                  text: total,
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
