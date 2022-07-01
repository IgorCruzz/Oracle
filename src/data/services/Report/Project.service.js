import ExcelJS from 'exceljs';
import { format } from 'date-fns';
import {
  Project,
  Project_phase,
  Product,
  City,
  Region,
  Category,
} from '../../database/models';

export class ProjectService {
  async execute({
    page,
    limit,
    id_region,
    id_city,
    cd_priority,
    download,
    id_project,
  }) {
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
          ...rest
        } = project.dataValues;

        Data.push({
          value: vl_contract || vl_bid || vl_estimated,
          ...rest,
        });
      })
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

      worksheet.getCell('A5').value = 'FILTROS:';
      worksheet.getCell('A5').font = {
        bold: true,
      };

      worksheet.getCell('A6').value = 'Região:';
      worksheet.getCell('A6').font = {
        bold: true,
      };
      worksheet.getCell('A7').value = 'Município:';
      worksheet.getCell('A7').font = {
        bold: true,
      };
      worksheet.getCell('A8').value = 'Prioridade:';
      worksheet.getCell('A8').font = {
        bold: true,
      };

      worksheet.getCell('A10').value = 'Nome do Projeto';
      worksheet.getCell('A10').font = {
        bold: true,
      };
      worksheet.getCell('B10').value = 'Número SEI';
      worksheet.getCell('B10').font = {
        bold: true,
      };
      worksheet.getCell('C10').value = 'Município';
      worksheet.getCell('C10').font = {
        bold: true,
      };
      worksheet.getCell('D10').value = 'Prioridade';
      worksheet.getCell('D10').font = {
        bold: true,
      };
      worksheet.getCell('E10').value = 'Valor';
      worksheet.getCell('E10').font = {
        bold: true,
      };
      worksheet.getCell('F10').value = 'M2';
      worksheet.getCell('F10').font = {
        bold: true,
      };
      worksheet.getCell('G10').value = 'Fase';
      worksheet.getCell('G10').font = {
        bold: true,
      };
      worksheet.getCell('H10').value = '% Completude da Fase';
      worksheet.getCell('H10').font = {
        bold: true,
      };

      for (let i = 0; i <= Data.length - 1; i++) {
        let num = 11;

        worksheet.getCell(`A${String(num + i)}`).value = Data[i].nm_project;
        worksheet.getCell(`B${String(num + i)}`).value =
          Data[i].cd_sei || 'Não Possui';
        worksheet.getCell(`C${String(num + i)}`).value = Data[i].city.nm_city;
        worksheet.getCell(`D${String(num + i)}`).value =
          (Data[i].cd_priority === 1 && 'Baixa') ||
          (Data[i].cd_priority === 2 && 'Média') ||
          (Data[i].cd_priority === 3 && 'Alta');
        worksheet.getCell(`E${String(num + i)}`).value = Data[i].value;
        worksheet.getCell(`F${String(num + i)}`).value =
          Data[i].qt_m2 || 'Não Possui';
        worksheet.getCell(`G${String(num + i)}`).value = Data[i].project_phase;
        worksheet.getCell(`H${String(num + i)}`).value =
          Data[i].phaseCompletion;

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

      worksheet.getCell('B2').value = 'Portfolio de Projetos';
      worksheet.getCell('B3').value = format(new Date(), 'dd/MM/yyyy');

      worksheet.getCell('B6').value = id_region
        ? await Region.findByPk(id_region).dataValues.nm_region
        : 'Filtro não informado.';
      worksheet.getCell('B7').value = id_city
        ? await City.findByPk(id_city).dataValues.nm_city
        : 'Filtro não informado.';
      worksheet.getCell('B8').value = cd_priority
        ? (cd_priority === '1' && 'Baixa') ||
          (cd_priority === '2' && 'Média') ||
          (cd_priority === '3' && 'Alta')
        : 'Filtro não informado.';

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
