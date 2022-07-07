import Sequelize, { Op } from 'sequelize';
import { format, parseISO, differenceInDays } from 'date-fns';
import ExcelJS from 'exceljs';
import {
  Product_history,
  Allocation_period,
  Product,
  Project_phase,
  Project,
  Professional,
  Role_grade,
  Role,
  Grade,
  Sector,
} from '../../database/models';
import { calculateHour } from '../../../utils/calculateHour';

export class ReportProfessionalService {
  async execute({ page, limit, id_professional, download }) {
    const findLastRecord = await Product_history.findAll({
      attributes: [
        [
          Sequelize.fn('MAX', Sequelize.col('id_product_history')),
          'id_product_history',
        ],
      ],
      group: Sequelize.col('id_product'),
      raw: true,
    });

    const values = findLastRecord.map(
      ({ id_product_history }) => id_product_history
    );

    const productHistories = await Product_history.findAll({
      limit: limit !== 'all' ? Number(limit) : null,
      offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
      raw: true,
      where: {
        [Op.and]: [
          {
            id_product_history: {
              [Op.in]: values,
            },
          },
          {
            id_professional,
          },
        ],
      },
      include: [
        {
          model: Product,
          as: 'product',
          include: [
            {
              model: Project_phase,
              as: 'project_phase',
              include: [
                {
                  model: Project,
                  as: 'project',
                },
              ],
            },
          ],
        },
        {
          model: Allocation_period,
          as: 'allocation',
          attributes: [
            'dt_start_allocation',
            'dt_end_allocation',
            'qt_business_hours',
          ],
        },
      ],
    });

    const response = Promise.all(
      productHistories.map(async productHistory => {
        const testeee = await Product_history.findAll({
          raw: true,
          where: {
            [Op.and]: [
              {
                id_product: productHistory['product.id_product'],
              },
              {
                id_allocation_period: productHistory.id_allocation_period,
              },
              {
                [Op.or]: [
                  {
                    cd_status: 4,
                  },
                  {
                    cd_status: 2,
                  },
                ],
              },
            ],
          },
        });

        const corretion = await Product_history.findAll({
          raw: true,
          where: {
            [Op.and]: [
              {
                id_product: productHistory['product.id_product'],
              },
              {
                id_allocation_period: productHistory.id_allocation_period,
              },
              {
                cd_status: 3,
              },
            ],
          },
        });

        const status = await Product_history.findOne({
          raw: true,
          where: {
            [Op.and]: [
              {
                id_product_history: {
                  [Op.in]: values,
                },
              },
              {
                id_product: productHistory['product.id_product'],
              },
              {
                id_allocation_period: productHistory.id_allocation_period,
              },
            ],
          },
        });

        return {
          id_professional,

          allocation_period: `${format(
            new Date(productHistory['allocation.dt_start_allocation']),
            'dd/MM/yyyy'
          )} - ${format(
            new Date(productHistory['allocation.dt_end_allocation']),
            'dd/MM/yyyy'
          )} (${productHistory['allocation.qt_business_hours']}h)`,
          nm_project:
            productHistory['product.project_phase.project.nm_project'],
          nm_product: productHistory['product.nm_product'],
          hour: calculateHour({
            max: productHistory['product.qt_maximum_hours'],
            min: productHistory['product.qt_minimum_hours'],
            prov: productHistory['product.qt_probable_hours'],
            value: productHistory['product.tp_required_action'],
          }),
          tp_required_action:
            (productHistory['product.tp_required_action'] === 0 &&
              'Não Definida') ||
            (productHistory['product.tp_required_action'] === 1 &&
              'Produção Integral') ||
            (productHistory['product.tp_required_action'] === 2 &&
              'Produção Parcial') ||
            (productHistory['product.tp_required_action'] === 3 &&
              'Dispensado') ||
            (productHistory['product.tp_required_action'] === 4 &&
              'Concluído pelo demandante'),
          delivery_forecast: format(
            new Date(productHistory['allocation.dt_end_allocation']),
            'dd/MM/yyyy'
          ),
          last_delivery:
            testeee.length > 0
              ? format(
                  parseISO(testeee[testeee.length - 1].dt_status),
                  'dd/MM/yyyy'
                )
              : '',
          delay:
            testeee.length > 0
              ? differenceInDays(
                  parseISO(testeee[testeee.length - 1].dt_status),
                  new Date(productHistory['allocation.dt_end_allocation'])
                ) > 0 &&
                `Sim: ${differenceInDays(
                  parseISO(testeee[testeee.length - 1].dt_status),
                  new Date(productHistory['allocation.dt_end_allocation'])
                )} dias`
              : '',
          correction_needed: corretion.length > 0 ? 'Sim' : 'Não',
          cd_status:
            (status.cd_status === 0 && 'Ag. Alocação') ||
            (status.cd_status === 1 && 'Em Produção') ||
            (status.cd_status === 2 && 'Em Análise') ||
            (status.cd_status === 3 && 'Em Correção') ||
            (status.cd_status === 4 && 'Em Análise de Correção') ||
            (status.cd_status === 5 && 'Concluído'),
        };
      })
    );

    let buffer;

    if (download) {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('ExampleSheet');
      // /////////////////////////////////////////////////////////
      worksheet.getCell('A4').value = 'RELATÓRIO:';
      worksheet.getCell('A4').font = {
        bold: true,
      };
      worksheet.getCell('B4').value = 'Histórico do Colaborador';
      // /////////////////////////////////////////////////////////

      // /////////////////////////////////////////////////////////
      worksheet.getCell('A5').value = 'DATA:';
      worksheet.getCell('A5').font = {
        bold: true,
      };
      worksheet.getCell('B5').value = format(new Date(), 'dd/MM/yyyy');
      // /////////////////////////////////////////////////////////

      // /////////////////////////////////////////////////////////
      const getProfessionalData = await Professional.findOne({
        where: {
          id_professional,
        },
        include: [
          {
            model: Role_grade,
            as: 'coustHH',
            include: [
              { model: Role, as: 'role' },
              { model: Grade, as: 'grade' },
            ],
          },
          {
            model: Sector,
            as: 'sector',
          },
        ],
      });

      worksheet.getCell('A8').value = 'Nome:';
      worksheet.getCell('A8').font = {
        bold: true,
      };
      worksheet.getCell('B8').value = getProfessionalData.nm_professional;
      worksheet.getCell('B8').alignment = {
        horizontal: 'left',
      };
      // /////////////////////////////////////////////////////////

      // /////////////////////////////////////////////////////////

      worksheet.getCell('A9').value = 'Setor:';
      worksheet.getCell('A9').font = {
        bold: true,
      };
      worksheet.getCell('B9').value = getProfessionalData.sector.nm_sector;
      worksheet.getCell('B9').alignment = {
        horizontal: 'left',
      };
      // /////////////////////////////////////////////////////////

      // /////////////////////////////////////////////////////////

      worksheet.getCell('C8').value = 'Função:';
      worksheet.getCell('C8').font = {
        bold: true,
      };
      worksheet.getCell('D8').value = getProfessionalData.coustHH.role.nm_role;
      worksheet.getCell('D8').alignment = {
        horizontal: 'left',
      };
      // /////////////////////////////////////////////////////////

      // /////////////////////////////////////////////////////////

      worksheet.getCell('C9').value = 'Cargo:';
      worksheet.getCell('C9').font = {
        bold: true,
      };
      worksheet.getCell('D9').value =
        getProfessionalData.coustHH.grade.nm_grade;
      worksheet.getCell('D9').alignment = {
        horizontal: 'left',
      };
      // /////////////////////////////////////////////////////////

      worksheet.getCell('A12').value = 'Período da PTI';
      worksheet.getCell('A12').font = {
        bold: true,
      };
      worksheet.getCell('B12').value = 'Projeto';
      worksheet.getCell('B12').font = {
        bold: true,
      };
      worksheet.getCell('C12').value = 'Produto';
      worksheet.getCell('C12').font = {
        bold: true,
      };
      worksheet.getCell('D12').value = 'Horas';
      worksheet.getCell('D12').font = {
        bold: true,
      };
      worksheet.getCell('E12').value = 'Ação';
      worksheet.getCell('E12').font = {
        bold: true,
      };
      worksheet.getCell('F12').value = 'Previsão de Entrega';
      worksheet.getCell('F12').font = {
        bold: true,
      };
      worksheet.getCell('G12').value = 'Última Entrega';
      worksheet.getCell('G12').font = {
        bold: true,
      };
      worksheet.getCell('H12').value = 'Atraso';
      worksheet.getCell('H12').font = {
        bold: true,
      };
      worksheet.getCell('I12').value = 'Necessário Correção';
      worksheet.getCell('I12').font = {
        bold: true,
      };
      worksheet.getCell('J12').value = 'Status do produto';
      worksheet.getCell('J12').font = {
        bold: true,
      };

      const colA = worksheet.getColumn('A');
      const colB = worksheet.getColumn('B');
      const colC = worksheet.getColumn('C');
      const colD = worksheet.getColumn('D');
      const colE = worksheet.getColumn('E');
      const colF = worksheet.getColumn('F');
      const colG = worksheet.getColumn('G');
      const colH = worksheet.getColumn('H');
      const colI = worksheet.getColumn('I');
      const colJ = worksheet.getColumn('J');

      colA.width = 20;
      colB.width = 20;
      colC.width = 20;
      colD.width = 20;
      colE.width = 20;
      colF.width = 20;
      colG.width = 20;
      colH.width = 20;
      colI.width = 20;
      colJ.width = 20;

      const list = await response;

      for (let i = 0; i <= list.length - 1; i++) {
        let num = 13;

        worksheet.getCell(`A${String(num + i)}`).value =
          list[i].allocation_period;
        worksheet.getCell(`B${String(num + i)}`).value = list[i].nm_project;
        worksheet.getCell(`C${String(num + i)}`).value = list[i].nm_product;
        worksheet.getCell(`D${String(num + i)}`).value = list[i].hour;
        worksheet.getCell(`E${String(num + i)}`).value =
          list[i].tp_required_action;
        worksheet.getCell(`F${String(num + i)}`).value =
          list[i].delivery_forecast;
        worksheet.getCell(`G${String(num + i)}`).value = list[i].last_delivery;
        worksheet.getCell(`H${String(num + i)}`).value = list[i].delay;
        worksheet.getCell(`I${String(num + i)}`).value =
          list[i].correction_needed;
        worksheet.getCell(`J${String(num + i)}`).value = list[i].cd_status;

        worksheet.getCell(`A${String(num + i)}`).alignment = {
          horizontal: 'left',
        };
        worksheet.getCell(`B${String(num + i)}`).alignment = {
          horizontal: 'left',
        };
        worksheet.getCell(`C${String(num + i)}`).alignment = {
          horizontal: 'left',
        };
        worksheet.getCell(`D${String(num + i)}`).alignment = {
          horizontal: 'left',
        };
        worksheet.getCell(`E${String(num + i)}`).alignment = {
          horizontal: 'left',
        };
        worksheet.getCell(`F${String(num + i)}`).alignment = {
          horizontal: 'left',
        };
        worksheet.getCell(`G${String(num + i)}`).alignment = {
          horizontal: 'left',
        };
        worksheet.getCell(`H${String(num + i)}`).alignment = {
          horizontal: 'left',
        };

        worksheet.getCell(`I${String(num + i)}`).alignment = {
          horizontal: 'left',
        };
        worksheet.getCell(`J${String(num + i)}`).alignment = {
          horizontal: 'left',
        };

        num++;
      }

      buffer = await workbook.xlsx.writeBuffer();
    }

    return {
      projects: {
        count: response.length,
        rows: await response,
        buffer,
      },
    };
  }
}
