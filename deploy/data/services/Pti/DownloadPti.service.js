"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _pdfmake = require('pdfmake'); var _pdfmake2 = _interopRequireDefault(_pdfmake);
var _path = require('path');
var _datefns = require('date-fns');








var _models = require('../../database/models');

 class DownloadPtiService {
  async execute({ id_allocation_period, id_professional }) {
    const getProfessional = await _models.Professional.findOne({
      where: {
        id_professional,
      },
    });

    const getAllocationPeriod = await _models.Allocation_period.findOne({
      where: {
        id_allocation_period,
      },
    });

    const {
      dt_start_allocation,
      dt_end_allocation,
      qt_business_hours,
    } = getAllocationPeriod;

    const period = `${_datefns.format.call(void 0, 
      new Date(dt_start_allocation),
      'dd/MM/yyyy'
    )} - ${_datefns.format.call(void 0, 
      new Date(dt_end_allocation),
      'dd/MM/yyyy'
    )} (${qt_business_hours}h)`;

    const { nm_professional } = getProfessional;

    const project = await _models.Project.findAll({
      include: [
        {
          model: _models.City,
          as: 'city',
        },
        {
          model: _models.Project_phase,
          as: 'project_phase',
          required: true,
          include: [
            {
              model: _models.Product,
              as: 'product',
              required: true,
              include: [
                {
                  model: _models.Allocation,
                  as: 'allocation',
                  required: true,
                  include: [
                    {
                      model: _models.Professional,
                      as: 'professional',
                      required: true,
                      where: { id_professional },
                    },
                    {
                      model: _models.Allocation_period,
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

    const totals = project.map(proj => {
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

    const qtHoursPictures = [];

    totals.map(qtHourPicture =>
      qtHourPicture.map(value => qtHoursPictures.push(value))
    );

    const sum = qtHoursPictures.reduce((a, b) => a + b, 0);

    const fonts = {
      Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique',
      },
    };
    const printer = new (0, _pdfmake2.default)(fonts);

    const docDefinition = {
      pageOrientation: 'landscape',
      pageMargins: [20, 20, 20, 20],
      defaultStyle: { font: 'Helvetica' },

      content: [
        {
          // IMAGES
          columns: [
            {
              image: _path.resolve.call(void 0, 
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
              image: _path.resolve.call(void 0, 
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
              image: _path.resolve.call(void 0, 
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
              image: _path.resolve.call(void 0, 
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
              image: _path.resolve.call(void 0, 
                __dirname,
                '..',
                '..',
                '..',
                'utils',
                'img',
                'fundacao.jpeg'
              ),
              width: 50,
              height: 50,
              margin: [0, 5, 20, 5],
            },
          ],
        },
        {
          text: 'divider',
          style: 'blank',
        },
        // PROFESSIONAL
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
        // TABLE
        {
          table: {
            widths: ['10%', '32%', '35%', '15%', '8%'],
            body: [
              // TABLE HEAD
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
              // TABLE BODY
              ...values,
            ],
          },
        },
        // TOTAL
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
                  text: sum.toFixed(2),
                  style: 'total',
                  borderColor: ['#B0C4DE', '#B0C4DE', '#B0C4DE', '#B0C4DE'],
                  bold: true,
                },
              ],
            ],
          },
        },
        // SIGNATURES
        {
          stack: [
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
              text: `Responsável pelo Plano de Trabalho          ${nm_professional}`,
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
              text: 'Coordenador',
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
              text: 'Presidente do IEEA',
              style: 'signatureText',
              margin: [0, 5, 20, 5],
            },
          ],
          margin: [0, 20, 0, 0],
          unbreakable: true,
        },
      ],
      // STYLES
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
} exports.DownloadPtiService = DownloadPtiService;
