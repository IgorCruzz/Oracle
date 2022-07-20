import { ContactRepository } from '../../database/repositories';

export class FindContactsService {
  async execute({ page, limit, nm_sector }) {
    const repository = new ContactRepository();

    const findContacts = await repository.findContacts({
      limit,
      page,
      nm_sector,
    });

    if (findContacts.length === 0)
      return { error: 'Não há nenhum Contato registrado.' };

    return {
      contacts: findContacts,
    };
  }
}
