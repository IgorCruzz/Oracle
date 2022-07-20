import { ContactHistoryRepository } from '../../database/repositories';

export class DeleteContactHistoryService {
  async execute({ id_contact_history }) {
    const repository = new ContactHistoryRepository();

    const verifyContactExists = await repository.findContactHistoryById({
      id_contact_history,
    });

    if (!verifyContactExists)
      return {
        error: `Não existe um Histórico de contato com este ID -> ${id_contact_history}.`,
      };

    await repository.deleteContactHistory({
      id_contact_history,
    });

    return {
      message: 'Histórico de Contato excluído com sucesso!',
    };
  }
}
