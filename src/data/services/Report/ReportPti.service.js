import Sequelize, { Op } from 'sequelize';
import ExcelJS from 'exceljs';
import { format } from 'date-fns';
import {
  Allocation,
  Professional,
  Allocation_period,
  Product,
  Project_phase,
  Project,
  City,
  Product_history,
} from '../../database/models';

export class ReportPtiService {
  async execute({ page, limit, id_allocation_period, download }) {
    const professionals = await Professional.findAndCountAll({
      limit: limit !== 'all' ? Number(limit) : null,
      order: [['nm_professional', 'ASC']],
      offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,

      include: [
        {
          model: Allocation,
          as: 'allocation',
          where: id_allocation_period
            ? {
                [Op.and]: [
                  {
                    id_allocation_period,
                  },
                ],
              }
            : {},

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
              model: Allocation_period,

              as: 'allocation_period',
            },
          ],
        },
      ],
    });

    const getProfessionals = Promise.all(
      professionals.rows.map(professional => {
        const prof = professional.dataValues;

        const { allocation } = prof;

        return Promise.all(
          allocation.map(async alloc => {
            const {
              id_allocation_period: idAllocation_period,
              id_professional,
            } = alloc.dataValues;

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
              where: {
                [Op.and]: [
                  {
                    id_product_history: {
                      [Op.in]: values,
                    },
                  },
                  {
                    id_product: alloc.dataValues.product.dataValues.id_product,
                  },
                  {
                    id_allocation_period: idAllocation_period,
                  },
                  {
                    id_professional,
                  },
                ],
              },
              raw: true,
            });

            return {
              nm_project:
                alloc.dataValues.product.dataValues.project_phase.dataValues
                  .project.dataValues.nm_project,
              cd_sei:
                alloc.dataValues.product.dataValues.project_phase.dataValues
                  .project.dataValues.cd_sei || 'Não Possui',
              nm_professional: prof.nm_professional,
              nm_city:
                alloc.dataValues.product.dataValues.project_phase.dataValues
                  .project.dataValues.city.dataValues.nm_city,
              nm_product: alloc.dataValues.product.dataValues.nm_product,
              tp_action_picture:
                (alloc.dataValues.tp_action_picture === 0 && 'Não Definida') ||
                (alloc.dataValues.tp_action_picture === 1 &&
                  'Produção Integral') ||
                (alloc.dataValues.tp_action_picture === 2 &&
                  'Produção Parcial') ||
                (alloc.dataValues.tp_action_picture === 3 && 'Dispensado') ||
                (alloc.dataValues.tp_action_picture === 4 &&
                  'Concluído pelo demandante'),
              qt_hours_picture: alloc.dataValues.qt_hours_picture,
              cd_status:
                (productHistories[productHistories.length - 1].cd_status ===
                  0 &&
                  'Ag. Alocação') ||
                (productHistories[productHistories.length - 1].cd_status ===
                  1 &&
                  'Em Produção') ||
                (productHistories[productHistories.length - 1].cd_status ===
                  2 &&
                  'Em Análise') ||
                (productHistories[productHistories.length - 1].cd_status ===
                  3 &&
                  'Em Correção') ||
                (productHistories[productHistories.length - 1].cd_status ===
                  4 &&
                  'Em Análise de Correção') ||
                (productHistories[productHistories.length - 1].cd_status ===
                  5 &&
                  'Concluído'),
            };
          })
        );
      })
    );

    const professionalList = [];

    (await getProfessionals).map(profess =>
      profess.map(teste => professionalList.push(teste))
    );

    let buffer;

    if (download) {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('ExampleSheet');

      worksheet.getCell('A2').value = 'RELATÓRIO:';
      worksheet.getCell('A2').font = {
        bold: true,
      };

      worksheet.getCell('A3').value = 'DATA:';
      worksheet.getCell('A3').font = {
        bold: true,
      };

      worksheet.getCell('B2').value = 'PTI';
      worksheet.getCell('B3').value = format(new Date(), 'dd/MM/yyyy');

      // /////////////////////////////////////////////////////////
      const getAllocation = await Allocation_period.findByPk(
        id_allocation_period
      );

      worksheet.getCell('A6').value = 'Período:';
      worksheet.getCell('A6').font = {
        bold: true,
      };

      worksheet.getCell('B6').value = `${format(
        new Date(getAllocation.dt_start_allocation),
        'dd/MM/yyyy'
      )} - ${format(
        new Date(getAllocation.dt_end_allocation),
        'dd/MM/yyyy'
      )} (${getAllocation.qt_business_hours}h)`;

      // /////////////////////////////////////////////////////////

      worksheet.getCell('A10').value = 'Projeto';
      worksheet.getCell('A10').font = {
        bold: true,
      };
      worksheet.getCell('B10').value = 'SEI';
      worksheet.getCell('B10').font = {
        bold: true,
      };
      worksheet.getCell('C10').value = 'Município';
      worksheet.getCell('C10').font = {
        bold: true,
      };
      worksheet.getCell('D10').value = 'Responsável';
      worksheet.getCell('D10').font = {
        bold: true,
      };
      worksheet.getCell('E10').value = 'Produto';
      worksheet.getCell('E10').font = {
        bold: true,
      };
      worksheet.getCell('F10').value = 'Ação';
      worksheet.getCell('F10').font = {
        bold: true,
      };
      worksheet.getCell('G10').value = 'Horas';
      worksheet.getCell('G10').font = {
        bold: true,
      };
      worksheet.getCell('H10').value = 'Status do produto';
      worksheet.getCell('H10').font = {
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

      colA.width = 20;
      colB.width = 20;
      colC.width = 20;
      colD.width = 20;
      colE.width = 20;
      colF.width = 20;
      colG.width = 20;
      colH.width = 20;

      for (let i = 0; i <= professionalList.length - 1; i++) {
        let num = 11;

        worksheet.getCell(`A${String(num + i)}`).value =
          professionalList[i].nm_project;
        worksheet.getCell(`B${String(num + i)}`).value =
          professionalList[i].cd_sei;
        worksheet.getCell(`C${String(num + i)}`).value =
          professionalList[i].nm_city;
        worksheet.getCell(`D${String(num + i)}`).value =
          professionalList[i].nm_professional;
        worksheet.getCell(`E${String(num + i)}`).value =
          professionalList[i].nm_product;
        worksheet.getCell(`F${String(num + i)}`).value =
          professionalList[i].tp_action_picture;
        worksheet.getCell(`G${String(num + i)}`).value =
          professionalList[i].qt_hours_picture;
        worksheet.getCell(`H${String(num + i)}`).value =
          professionalList[i].cd_status;

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

        num++;
      }

      buffer = await workbook.xlsx.writeBuffer();
    }

    return {
      ptis: {
        count: professionals.count,
        rows: professionalList,
        buffer,
      },
    };
  }
}
