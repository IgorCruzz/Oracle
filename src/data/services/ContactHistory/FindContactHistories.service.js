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

    return {
      contactHistories: findContacts,
    };
  }
}
