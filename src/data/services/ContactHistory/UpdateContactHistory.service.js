import { ContactHistoryRepository } from '../../database/repositories';

export class UpdateContactHistoryService {
  async execute(id_contact, data) {
    const { nm_sector } = data;

    const repository = new ContactHistoryRepository();

    const verifyContactExists = await repository.findContactById({
      id_contact,
    });

    if (!verifyContactExists)
      return { error: `Não existe um Contato com este ID -> ${id_contact}.` };

    const verifyContactName = await repository.findContact({
      nm_sector,
    });

    if (
      verifyContactName &&
      verifyContactName.id_contact !== Number(id_contact)
    )
      return { error: 'Já existe um Contato registrado com este nome.' };

    const contactUpdated = await repository.updateContact(id_contact, data);

    return {
      message: 'Contato atualizado com sucesso!',
      contact: contactUpdated,
    };
  }
}
