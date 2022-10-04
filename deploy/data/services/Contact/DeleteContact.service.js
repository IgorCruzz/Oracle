"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _repositories = require('../../database/repositories');

 class DeleteContactService {
  async execute({ id_contact }) {
    const repository = new (0, _repositories.ContactRepository)();
    const repositoryContactHistory = new (0, _repositories.ContactHistoryRepository)();

    const verifyFk = await repositoryContactHistory.verifyRelation({
      id_contact,
    });

    if (verifyFk.length > 0) {
      return {
        error:
          'Não foi possível excluir o contato pois existem Contatos de Históricos associados.',
      };
    }

    const verifyContactExists = await repository.findContactById({
      id_contact,
    });

    if (!verifyContactExists)
      return { error: `Não existe um Contato com este ID -> ${id_contact}.` };

    await repository.deleteContact({
      id_contact,
    });

    return {
      message: 'Contato excluído com sucesso!',
    };
  }
} exports.DeleteContactService = DeleteContactService;
