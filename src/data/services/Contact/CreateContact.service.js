import { ContactRepository } from '../../database/repositories';

export class CreateContactService {
  async execute(data) {
    const { nm_contact, id_project } = data;

    const repository = new ContactRepository();

    const verifyContactExists = await repository.findContact({
      nm_contact,
      id_project,
    });

    if (verifyContactExists)
      return { error: 'Já existe um Contato registrado com este nome.' };

    const contact = await repository.createContact({ data });

    return {
      message: 'Contato adicionado com sucesso!',
      contact: contact.dataValues,
    };
  }
}
