import { format } from 'date-fns';
import { sequelize } from '../../database';

export class ReportContactService {
  async execute({
    page,
    limit,
    id_project,
    dt_contatct,
    dt_agreed_feedback,
    no_return,
  }) {
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
      ${limit !== 'all' &&
        `LIMIT ${limit} OFFSET ${(Number(page) - 1) * Number(limit)}`} `
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

    return {
      contacts: {
        count: count[0].count,
        rows: formattedValues,
        buffer: false,
      },
    };
  }
}
