import { Op } from 'sequelize';
import ExcelJS from 'exceljs';
import { format } from 'date-fns';
import {
  Project,
  Project_phase,
  Product,
  City,
  Region,
  Category,
  Product_history,
  Professional,
  Allocation_period,
  Allocation,
} from '../../database/models';

export class ReportPtiService {
  async execute({ page, limit, id_region, id_city, download, id_project }) {
    const projects = await Project.findAndCountAll({
      limit: limit !== 'all' ? Number(limit) : null,
      offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
      where: id_project ? { id_project } : {},
      attributes: [
        'id_project',
        'nm_project',
        'cd_sei',
        'cd_priority',
        'qt_m2',
        'vl_estimated',
        'vl_bid',
        'vl_contract',
      ],
      include: [
        id_city || id_region
          ? {
              model: City,
              as: 'city',
              where: { id_city },
              attributes: ['nm_city'],
              include: [
                {
                  model: Region,
                  as: 'region',
                  attributes: ['nm_region'],
                  where: { id_region },
                },
              ],
            }
          : {
              model: City,
              as: 'city',
              attributes: ['nm_city'],
              include: [
                {
                  model: Region,
                  as: 'region',
                  attributes: ['nm_region'],
                },
              ],
            },
        {
          model: Category,
          as: 'category',
        },
        {
          model: Project_phase,
          as: 'project_phase',
          attributes: ['id_project_phase', 'nu_order', 'nm_project_phase'],
          include: [
            {
              model: Product,
              as: 'product',
              include: [
                {
                  model: Product_history,
                  as: 'product_history',
                  include: [
                    {
                      model: Professional,
                      as: 'professional',
                    },
                    {
                      model: Allocation_period,
                      as: 'allocation',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    const Data = [];

    await Promise.all(
      projects.rows.map(async project => {
        const {
          vl_contract,
          vl_bid,
          vl_estimated,
          project_phase,
          nm_project,
          cd_sei,
          city,
          category,
          qt_m2,
        } = project.dataValues;

        const idProjectPhases = project_phase.map(
          project_phase2 => project_phase2.dataValues.id_project_phase
        );

        const products = await Product.findAll({
          where: {
            id_project_phase: {
              [Op.in]: idProjectPhases,
            },
          },

          include: [
            {
              model: Project_phase,
              as: 'project_phase',
            },
            {
              model: Allocation,
              as: 'allocation',
            },
            {
              model: Product_history,
              as: 'product_history',
              include: [
                {
                  model: Allocation_period,
                  as: 'allocation',
                },
                {
                  model: Professional,
                  as: 'professional',
                },
              ],
            },
          ],
        });

        console.log({
          idProjectPhases,
          products: [
            ...new Set(products.map(a => a.project_phase.id_project_phase)),
          ],
        });

        Data.push({
          project: {
            nm_project,
            cd_sei,
            city: city.nm_city,
            category: category.nm_category,
            value: vl_contract || vl_bid || vl_estimated,
            qt_m2,
          },
          products,
          project_phase,
        });
      })
    );

    let buffer;

    if (download) {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('ExampleSheet');

      const [
        {
          project: { nm_project, cd_sei, city, category, value, qt_m2 },
          products,
        },
      ] = Data;

      worksheet.getCell('A2').value = 'RELATÓRIO:';
      worksheet.getCell('A2').font = {
        bold: true,
      };

      worksheet.getCell('A3').value = 'DATA:';
      worksheet.getCell('A3').font = {
        bold: true,
      };

      worksheet.getCell('B2').value = 'Portfolio de Projetos';
      worksheet.getCell('B3').value = format(new Date(), 'dd/MM/yyyy');

      // /////////////////////////////////////////////////////////
      worksheet.getCell('A6').value = 'PROJETO:';
      worksheet.getCell('A6').font = {
        bold: true,
      };

      worksheet.getCell('B6').value = nm_project;
      worksheet.getCell('B6').alignment = {
        horizontal: 'left',
      };
      // /////////////////////////////////////////////////////////

      // /////////////////////////////////////////////////////////
      worksheet.getCell('A7').value = 'SEI:';
      worksheet.getCell('A7').font = {
        bold: true,
      };

      worksheet.getCell('B7').value = cd_sei || 'Não Possui';
      worksheet.getCell('B7').alignment = {
        horizontal: 'left',
      };
      // /////////////////////////////////////////////////////////

      // /////////////////////////////////////////////////////////
      worksheet.getCell('C6').value = 'MUNICÍPIO:';
      worksheet.getCell('C6').font = {
        bold: true,
      };

      worksheet.getCell('D6').value = city;
      worksheet.getCell('D6').alignment = {
        horizontal: 'left',
      };
      // /////////////////////////////////////////////////////////

      // /////////////////////////////////////////////////////////
      worksheet.getCell('C7').value = 'CATEGORIA:';
      worksheet.getCell('C7').font = {
        bold: true,
      };
      worksheet.getCell('D7').value = category;
      worksheet.getCell('D7').alignment = {
        horizontal: 'left',
      };
      // /////////////////////////////////////////////////////////

      // /////////////////////////////////////////////////////////
      worksheet.getCell('E6').value = 'VALOR:';
      worksheet.getCell('E6').font = {
        bold: true,
      };
      worksheet.getCell('F6').value = value;
      worksheet.getCell('F6').alignment = {
        horizontal: 'left',
      };
      // /////////////////////////////////////////////////////////

      // /////////////////////////////////////////////////////////
      worksheet.getCell('E7').value = 'ÁREA (m2):';
      worksheet.getCell('E7').font = {
        bold: true,
      };
      worksheet.getCell('F7').value = qt_m2 || 'Não Possui';
      worksheet.getCell('F7').alignment = {
        horizontal: 'left',
      };
      // /////////////////////////////////////////////////////////

      worksheet.getCell('A10').value = 'Fase';
      worksheet.getCell('A10').font = {
        bold: true,
      };
      worksheet.getCell('B10').value = 'Produto';
      worksheet.getCell('B10').font = {
        bold: true,
      };
      worksheet.getCell('C10').value = 'Périodo de PTI';
      worksheet.getCell('C10').font = {
        bold: true,
      };
      worksheet.getCell('D10').value = 'Responsável';
      worksheet.getCell('D10').font = {
        bold: true,
      };
      worksheet.getCell('E10').value = 'Status do produto';
      worksheet.getCell('E10').font = {
        bold: true,
      };

      const colA = worksheet.getColumn('A');
      const colB = worksheet.getColumn('B');
      const colC = worksheet.getColumn('C');
      const colD = worksheet.getColumn('D');
      const colE = worksheet.getColumn('E');
      const colF = worksheet.getColumn('F');

      colA.width = 20;
      colB.width = 20;
      colC.width = 20;
      colD.width = 20;
      colE.width = 20;
      colF.width = 20;

      for (let i = 0; i <= products.length - 1; i++) {
        let num = 11;

        worksheet.getCell(`A${String(num + i)}`).value =
          products[i].project_phase.nm_project_phase;
        worksheet.getCell(`B${String(num + i)}`).value = products[i].nm_product;
        worksheet.getCell(`C${String(num + i)}`).value =
          // ///////////////
          `${format(
            new Date(
              products[i].product_history[
                products[i].product_history.length - 1
              ].allocation.dt_start_allocation
            ),
            'dd/MM/yyyy'
          )} - ${format(
            new Date(
              products[i].product_history[
                products[i].product_history.length - 1
              ].allocation.dt_end_allocation
            ),
            'dd/MM/yyyy'
          )} (${
            products[i].product_history[products[i].product_history.length - 1]
              .allocation.qt_business_hours
          }h)`;
        // //////////

        worksheet.getCell(`D${String(num + i)}`).value =
          products[i].product_history[
            products[i].product_history.length - 1
          ].professional.nm_professional;
        worksheet.getCell(`E${String(num + i)}`).value =
          (products[i].product_history[products[i].product_history.length - 1]
            .cd_status === 0 &&
            'Ag. Alocação') ||
          (products[i].product_history[products[i].product_history.length - 1]
            .cd_status === 1 &&
            'Em Produção') ||
          (products[i].product_history[products[i].product_history.length - 1]
            .cd_status === 2 &&
            'Em Análise') ||
          (products[i].product_history[products[i].product_history.length - 1]
            .cd_status === 3 &&
            'Em Correção') ||
          (products[i].product_history[products[i].product_history.length - 1]
            .cd_status === 4 &&
            'Em Análise de Correção') ||
          (products[i].product_history[products[i].product_history.length - 1]
            .cd_status === 5 &&
            'Concluído');

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

        num++;
      }

      buffer = await workbook.xlsx.writeBuffer();
    }

    return {
      projects: {
        count: Data.length,
        rows: Data,
        buffer,
      },
    };
  }
}
