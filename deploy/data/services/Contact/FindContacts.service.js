"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindContactsService {
  async execute({ page, limit, id_project }) {
    const repository = new (0, _repositories.ContactRepository)();

    const findContacts = await repository.findContacts({
      limit,
      page,
      id_project,
    });

    if (findContacts.length === 0)
      return { error: 'Não há nenhum Contato registrado.' };

    return {
      contacts: findContacts,
    };
  }
} exports.FindContactsService = FindContactsService;
