import ExcelJS from 'exceljs';
import { format } from 'date-fns';
import { sequelize } from '../../database';

export class ReportContactService {
  async execute({
    page,
    limit,
    download,
    dt_contatct,
    id_project,
    dt_feedback,
    no_feedback,
  }) {
    const [results] = await sequelize.query(
      `SELECT *  FROM (SELECT nm_project, nm_city, dt_contatct, hr_contact, ds_contact, nm_contact, nu_phone, dt_agreed_feedback, dt_feedback 
        FROM gerobras.project LEFT JOIN gerobras.city ON gerobras.city.id_city = gerobras.project.id_city 
        LEFT JOIN gerobras.contact ON gerobras.contact.id_project = gerobras.project.id_project 
        LEFT JOIN gerobras.contact_history ON gerobras.contact_history.id_contact = gerobras.contact.id_contact) AS contact  
       
        WHERE 
        ${
          dt_contatct
            ? `dt_contatct > ${dt_contatct} AND`
            : 'dt_contatct = dt_contatct AND'
        } 
        ${
          id_project
            ? `id_project > ${id_project} AND`
            : `id_project = id_project AND`
        } 
        ${
          dt_feedback
            ? `dt_feedback > ${dt_feedback}`
            : `id_project = id_project AND`
        } 
        ${no_feedback ? `dt_feedback is NULL` : `id_project = id_project`}
        ${limit !== 'all' ? `LIMIT ${limit} OFFSET ${page}` : ''}`
    );

    const [count] = await sequelize.query(
      'SELECT COUNT(nm_project) AS count FROM (SELECT nm_project, nm_city, dt_contatct, hr_contact, ds_contact, nm_contact, nu_phone, dt_agreed_feedback, dt_feedback FROM gerobras.project LEFT JOIN gerobras.city ON gerobras.city.id_city = gerobras.project.id_city LEFT JOIN gerobras.contact ON gerobras.contact.id_project = gerobras.project.id_project LEFT JOIN gerobras.contact_history ON gerobras.contact_history.id_contact = gerobras.contact.id_contact) AS contact'
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

      worksheet.getCell('B2').value = 'Contatos';
      worksheet.getCell('B3').value = format(new Date(), 'dd/MM/yyyy');

      worksheet.getCell('A10').value = 'Projeto';
      worksheet.getCell('A10').font = {
        bold: true,
      };
      worksheet.getCell('B10').value = 'Município';
      worksheet.getCell('B10').font = {
        bold: true,
      };
      worksheet.getCell('C10').value = 'Data do contato';
      worksheet.getCell('C10').font = {
        bold: true,
      };
      worksheet.getCell('D10').value = 'Hora do contato';
      worksheet.getCell('D10').font = {
        bold: true,
      };
      worksheet.getCell('E10').value = 'Descrição do contato';
      worksheet.getCell('E10').font = {
        bold: true,
      };
      worksheet.getCell('F10').value = 'Nome do contato';
      worksheet.getCell('F10').font = {
        bold: true,
      };
      worksheet.getCell('G10').value = 'Telefone';
      worksheet.getCell('G10').font = {
        bold: true,
      };
      worksheet.getCell('H10').value = 'Data prevista do feedback';
      worksheet.getCell('H10').font = {
        bold: true,
      };
      worksheet.getCell('I10').value = 'Data do feedback';
      worksheet.getCell('I10').font = {
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

      colA.width = 20;
      colB.width = 20;
      colC.width = 20;
      colD.width = 20;
      colE.width = 20;
      colF.width = 20;
      colG.width = 20;
      colH.width = 20;
      colI.width = 20;

      for (let i = 0; i <= results.length - 1; i++) {
        let num = 11;

        worksheet.getCell(`A${String(num + i)}`).value = results[i].nm_project;
        worksheet.getCell(`B${String(num + i)}`).value = results[i].nm_city;
        worksheet.getCell(`C${String(num + i)}`).value = results[i].dt_contatct;
        worksheet.getCell(`D${String(num + i)}`).value = results[i].hr_contact;
        worksheet.getCell(`E${String(num + i)}`).value = results[i].ds_contact;
        worksheet.getCell(`F${String(num + i)}`).value = results[i].nm_contact;
        worksheet.getCell(`G${String(num + i)}`).value = results[i].nu_phone;
        worksheet.getCell(`H${String(num + i)}`).value =
          results[i].dt_agreed_feedback;
        worksheet.getCell(`I${String(num + i)}`).value = results[i].dt_feedback;

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

        num++;
      }

      buffer = await workbook.xlsx.writeBuffer();
    }

    return {
      contacts: {
        count: count[0].count,
        rows: results,
        buffer,
      },
    };
  }
}
