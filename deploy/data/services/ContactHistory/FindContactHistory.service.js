"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindContactHistoryService {
  async execute({ id_contact_history }) {
    const repository = new (0, _repositories.ContactHistoryRepository)();

    const findContact = await repository.findContactHistoryById({
      id_contact_history,
    });

    if (!findContact)
      return {
        error: `Não existe um Histórico de Contato com este ID -> ${id_contact_history}.`,
      };

    return {
      contactHistory: findContact,
    };
  }
} exports.FindContactHistoryService = FindContactHistoryService;
