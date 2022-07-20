import { ContactHistoryRepository } from '../../database/repositories';

export class FindContactHistoryService {
  async execute({ id_contact_history }) {
    const repository = new ContactHistoryRepository();

    const findContact = await repository.findContactById({
      id_contact_history,
    });

    if (!findContact)
      return {
        error: `Não existe um Contato com este ID -> ${id_contact_history}.`,
      };

    return {
      contact: findContact,
    };
  }
}
