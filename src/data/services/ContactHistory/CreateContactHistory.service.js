import { ContactHistoryRepository } from '../../database/repositories';

export class CreateContactHistoryService {
  async execute(data) {
    const repository = new ContactHistoryRepository();

    const contactHistory = await repository.createContactHistory(data);

    return {
      message: 'Histórico de Contato adicionado com sucesso!',
      contactHistory: contactHistory.dataValues,
    };
  }
}
