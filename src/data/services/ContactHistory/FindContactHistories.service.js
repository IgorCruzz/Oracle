import { format } from 'date-fns';
import { ContactHistoryRepository } from '../../database/repositories';

export class FindContactHistoriesService {
  async execute({ page, limit, id_contact }) {
    const repository = new ContactHistoryRepository();

    const findContacts = await repository.findContactHistories({
      limit,
      page,
      id_contact,
    });

    if (findContacts.length === 0)
      return { error: 'Não há nenhum Histórico de contato registrado.' };

    const getRows = findContacts.rows.map(data => ({
      ...data,
      dt_feedback: data.dt_feedback
        ? format(new Date(data.dt_feedback), 'dd/MM/yyyy')
        : null,
      dt_agreed_feedback: data.dt_agreed_feedback
        ? format(new Date(data.dt_agreed_feedback), 'dd/MM/yyyy')
        : null,
      dt_contatct: data.dt_contatct
        ? format(new Date(data.dt_contatct), 'dd/MM/yyyy')
        : null,
    }));

    return {
      contactHistories: {
        rows: getRows,
        count: findContacts.count,
      },
    };
  }
}
