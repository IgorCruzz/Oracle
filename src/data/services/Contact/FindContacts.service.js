import { ContactRepository } from '../../database/repositories';

export class FindContactsService {
  async execute({ page, limit, id_project }) {
    const repository = new ContactRepository();

    const findContacts = await repository.findContacts({
      limit,
      page,
      id_project,
    });

    if (findContacts.length === 0)
      return { error: 'Não há nenhum Contato registrado.' };

    return {
      contacts: findContacts,
    };
  }
}
