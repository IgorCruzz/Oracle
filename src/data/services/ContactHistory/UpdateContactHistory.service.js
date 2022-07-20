import {
  ContactHistoryRepository,
  ContactRepository,
} from '../../database/repositories';

export class UpdateContactHistoryService {
  async execute(id_contact_history, data) {
    const { id_contact } = data;

    const repository = new ContactHistoryRepository();
    const contactRepository = new ContactRepository();

    const verifyContactExists = await contactRepository.findContactById({
      id_contact,
    });

    if (!verifyContactExists)
      return {
        error: `Não existe um Contato com este ID -> ${id_contact}.`,
      };

    const verifyContactHistoryExists = await repository.findContactHistoryById({
      id_contact_history,
    });

    if (!verifyContactHistoryExists)
      return {
        error: `Não existe um Histórico de contato com este ID -> ${id_contact_history}.`,
      };

    const contactUpdated = await repository.updateContactHistory(
      id_contact_history,
      data
    );

    return {
      message: 'Histórico de Contato atualizado com sucesso!',
      contactHistory: contactUpdated,
    };
  }
}
