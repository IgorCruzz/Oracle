import { ContactHistoryRepository } from '../../database/repositories';

export class DeleteContactHistoryService {
  async execute({ id_contact_history }) {
    const repository = new ContactHistoryRepository();

    const verifyContactExists = await repository.findContactById({
      id_contact_history,
    });

    if (!verifyContactExists)
      return {
        error: `Não existe um Contato com este ID -> ${id_contact_history}.`,
      };

    await repository.deleteContact({
      id_contact_history,
    });

    return {
      message: 'Contato excluído com sucesso!',
    };
  }
}
