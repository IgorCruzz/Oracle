"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class DeleteContactHistoryService {
  async execute({ id_contact_history }) {
    const repository = new (0, _repositories.ContactHistoryRepository)();

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
} exports.DeleteContactHistoryService = DeleteContactHistoryService;
