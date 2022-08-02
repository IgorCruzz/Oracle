import { format } from 'date-fns';
import ExcelJS from 'exceljs';
import { sequelize } from '../../database';

export class ReportContactService {
  async execute({
    page,
    limit,
    id_project,
    dt_contatct,
    dt_agreed_feedback,
    no_return,
    download,
  }) {
    if (!id_project && !dt_contatct && !dt_agreed_feedback && !no_return) {
      return { error: 'Informe pelo menos uma opção de filtro!' };
    }

    const [results] = await sequelize.query(
      `SELECT 
      project.id_project, 
      nm_project, 
      nm_city, 
      dt_contatct, 
      hr_contact, 
      ds_contact, nm_contact, nu_phone, dt_agreed_feedback, dt_feedback FROM gerobras.project 
      INNER JOIN gerobras.city ON gerobras.city.id_city = gerobras.project.id_city
      INNER JOIN gerobras.contact ON gerobras.contact.id_project = gerobras.project.id_project 
      INNER JOIN gerobras.contact_history ON gerobras.contact.id_contact = gerobras.contact_history.id_contact 
      WHERE 
      ${
        id_project
          ? `project.id_project = "${id_project}"`
          : '(project.id_project = project.id_project || project.id_project is NULL)'
      } AND
      ${
        dt_contatct
          ? `dt_contatct >= "${dt_contatct}"`
          : '(dt_contatct = dt_contatct || dt_contatct is NULL)'
      } AND
      ${
        dt_agreed_feedback
          ? `dt_agreed_feedback >= "${dt_agreed_feedback}"`
          : '(dt_agreed_feedback = dt_agreed_feedback || dt_agreed_feedback is NULL)'
      } AND
      ${
        no_return
          ? `dt_feedback is NULL`
          : '(dt_feedback is NULL || dt_feedback = dt_feedback)'
      }
      ORDER BY dt_contatct ASC, hr_contact ASC
      ${
        limit !== 'all'
          ? `LIMIT ${limit} OFFSET ${(Number(page) - 1) * Number(limit)}`
          : ''
      }
       `
    );

    const [count] = await sequelize.query(
      `SELECT 
     COUNT(*) as count FROM gerobras.project 
      INNER JOIN gerobras.city ON gerobras.city.id_city = gerobras.project.id_city
      INNER JOIN gerobras.contact ON gerobras.contact.id_project = gerobras.project.id_project 
      INNER JOIN gerobras.contact_history ON gerobras.contact.id_contact = gerobras.contact_history.id_contact 
      WHERE 
      ${
        id_project
          ? `project.id_project = "${id_project}"`
          : '(project.id_project = project.id_project || project.id_project is NULL)'
      } AND
      ${
        dt_contatct
          ? `dt_contatct >= "${dt_contatct}"`
          : '(dt_contatct = dt_contatct || dt_contatct is NULL)'
      } AND
      ${
        dt_agreed_feedback
          ? `dt_agreed_feedback >= "${dt_agreed_feedback}"`
          : '(dt_agreed_feedback = dt_agreed_feedback || dt_agreed_feedback is NULL)'
      } AND
      ${
        no_return
          ? `dt_feedback is NULL`
          : '(dt_feedback is NULL || dt_feedback = dt_feedback)'
      }
   `
    );

    const formattedValues = results.map(
      ({
        id_project: idProject,
        nm_project,
        nm_city,
        dt_contatct: dtContatct,
        hr_contact,
        ds_contact,
        nm_contact,
        nu_phone,
        dt_agreed_feedback: dtAgreedFeedback,
        dt_feedback,
      }) => {
        return {
          id_project: idProject,
          nm_project,
          nm_city,
          dt_contatct: dtContatct
            ? format(new Date(dtContatct), 'dd/MM/yyyy')
            : '',
          hr_contact: hr_contact.slice(0, -3),
          ds_contact,
          nm_contact,
          nu_phone,
          dt_agreed_feedback: dtAgreedFeedback
            ? format(new Date(dtAgreedFeedback), 'dd/MM/yyyy')
            : '',
          dt_feedback: dt_feedback
            ? format(new Date(dt_feedback), 'dd/MM/yyyy')
            : '',
        };
      }
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
      worksheet.getCell('B4').value = 'Acompanhamento de Contatos';
      // /////////////////////////////////////////////////////////

      // /////////////////////////////////////////////////////////
      worksheet.getCell('A5').value = 'DATA:';
      worksheet.getCell('A5').font = {
        bold: true,
      };
      worksheet.getCell('B5').value = format(new Date(), 'dd/MM/yyyy');

      worksheet.getCell('A12').value = 'Projeto';
      worksheet.getCell('A12').font = {
        bold: true,
      };
      worksheet.getCell('B12').value = 'Município';
      worksheet.getCell('B12').font = {
        bold: true,
      };
      worksheet.getCell('C12').value = 'Data do contato';
      worksheet.getCell('C12').font = {
        bold: true,
      };
      worksheet.getCell('D12').value = 'Hora do contato';
      worksheet.getCell('D12').font = {
        bold: true,
      };
      worksheet.getCell('E12').value = 'Descrição';
      worksheet.getCell('E12').font = {
        bold: true,
      };
      worksheet.getCell('F12').value = 'Nome do Contato';
      worksheet.getCell('F12').font = {
        bold: true,
      };
      worksheet.getCell('G12').value = 'Telefone';
      worksheet.getCell('G12').font = {
        bold: true,
      };
      worksheet.getCell('H12').value = 'Retorno Previsto';
      worksheet.getCell('H12').font = {
        bold: true,
      };
      worksheet.getCell('I12').value = 'Retorno';
      worksheet.getCell('I12').font = {
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

      for (let i = 0; i <= formattedValues.length - 1; i++) {
        let num = 13;

        worksheet.getCell(`A${String(num + i)}`).value =
          formattedValues[i].nm_project;
        worksheet.getCell(`B${String(num + i)}`).value =
          formattedValues[i].nm_city;
        worksheet.getCell(`C${String(num + i)}`).value =
          formattedValues[i].dt_contatct;
        worksheet.getCell(`D${String(num + i)}`).value =
          formattedValues[i].hr_contact;
        worksheet.getCell(`E${String(num + i)}`).value =
          formattedValues[i].ds_contact;
        worksheet.getCell(`F${String(num + i)}`).value =
          formattedValues[i].nm_contact;
        worksheet.getCell(`G${String(num + i)}`).value =
          formattedValues[i].nu_phone;
        worksheet.getCell(`H${String(num + i)}`).value =
          formattedValues[i].dt_agreed_feedback;
        worksheet.getCell(`I${String(num + i)}`).value =
          formattedValues[i].dt_feedback;

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
      contacts: {
        count: count[0].count,
        rows: formattedValues,
        buffer,
      },
    };
  }
}
