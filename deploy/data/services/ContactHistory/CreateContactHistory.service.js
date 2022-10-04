"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');
var _verifyDate = require('../../../utils/verifyDate');

 class CreateContactHistoryService {
  async execute(data) {
    const { dt_contatct, dt_agreed_feedback, dt_feedback } = data;

    const repository = new (0, _repositories.ContactHistoryRepository)();

    let contact;
    let agreedFeedBack;
    let feedBack;

    if (dt_contatct) {
      contact = _verifyDate.verifyDate.call(void 0, {
        msg: 'Data de contato inválida. Utilize o formato dd/mm/yyyy',
        value: dt_contatct,
      });

      if (contact.error) {
        return { error: contact.error };
      }
    }

    if (dt_agreed_feedback) {
      agreedFeedBack = _verifyDate.verifyDate.call(void 0, {
        msg:
          'Data de previsão de feedback inválida. Utilize o formato dd/mm/yyyy',
        value: dt_agreed_feedback,
      });

      if (agreedFeedBack.error) {
        return { error: agreedFeedBack.error };
      }
    }

    if (dt_feedback) {
      feedBack = _verifyDate.verifyDate.call(void 0, {
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
} exports.CreateContactHistoryService = CreateContactHistoryService;
