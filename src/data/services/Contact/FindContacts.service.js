import { ContactRepository } from '../../database/repositories';

export class FindContactsService {
  async execute({ page, limit }) {
    const repository = new ContactRepository();

    const findContacts = await repository.findContacts({
      limit,
      page,
    });

    if (findContacts.length === 0)
      return { error: 'Não há nenhum Contato registrado.' };

    return {
      contacts: findContacts,
    };
  }
}
