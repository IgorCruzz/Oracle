import { ContactRepository } from '../../database/repositories';

export class FindContactsService {
  async execute({ page, limit, nm_sector }) {
    const repository = new ContactRepository();

    const findSectories = await repository.findContacts({
      limit,
      page,
      nm_sector,
    });

    if (findSectories.length === 0)
      return { error: 'Não há nenhum Setor registrado.' };

    return {
      contacts: findSectories,
    };
  }
}
