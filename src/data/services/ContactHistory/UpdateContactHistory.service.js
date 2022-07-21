import {
  ContactHistoryRepository,
  ContactRepository,
} from '../../database/repositories';
import { verifyDate } from '../../../utils/verifyDate';

export class UpdateContactHistoryService {
  async execute(id_contact_history, data) {
    const { id_contact, dt_contatct, dt_agreed_feedback, dt_feedback } = data;

    const repository = new ContactHistoryRepository();
    const contactRepository = new ContactRepository();

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
      { ...data, contact, agreedFeedBack, feedBack }
    );

    return {
      message: 'Histórico de Contato atualizado com sucesso!',
      contactHistory: contactUpdated,
    };
  }
}
