import { ContactHistoryRepository } from '../../database/repositories';
import { verifyDate } from '../../../utils/verifyDate';

export class CreateContactHistoryService {
  async execute(data) {
    const { dt_contatct, dt_agreed_feedback, dt_feedback } = data;

    const repository = new ContactHistoryRepository();

    let contact;
    let agreedFeedBack;
    let feedBack;

    if (dt_contatct) {
      contact = verifyDate({
        msg: 'Data de contato inválida. Utilize o formato dd/mm/yyyy',
        value: dt_contatct,
      });

      if (contact.error) {
        return { error: contact.error };
      }
    }

    if (dt_agreed_feedback) {
      agreedFeedBack = verifyDate({
        msg:
          'Data de previsão de feedback inválida. Utilize o formato dd/mm/yyyy',
        value: dt_agreed_feedback,
      });

      if (agreedFeedBack.error) {
        return { error: agreedFeedBack.error };
      }
    }

    if (dt_feedback) {
      feedBack = verifyDate({
        msg: 'Data de feedback inválida. Utilize o formato dd/mm/yyyy',
        value: dt_feedback,
      });

      if (feedBack.error) {
        return { error: feedBack.error };
      }
    }

    const contactHistory = await repository.createContactHistory({
      ...data,
      contact,
      agreedFeedBack,
      feedBack,
    });

    return {
      message: 'Histórico de Contato adicionado com sucesso!',
      contactHistory: contactHistory.dataValues,
    };
  }
}
