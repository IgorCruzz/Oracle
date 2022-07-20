import { ContactRepository } from '../../database/repositories';

export class FindContactService {
  async execute({ id_contact }) {
    const repository = new ContactRepository();

    const findContact = await repository.findContactById({
      id_contact,
    });

    if (!findContact)
      return { error: `Não existe um Contato com este ID -> ${id_contact}.` };

    return {
      contact: findContact,
    };
  }
}
