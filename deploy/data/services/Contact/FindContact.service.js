"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindContactService {
  async execute({ id_contact }) {
    const repository = new (0, _repositories.ContactRepository)();

    const findContact = await repository.findContactById({
      id_contact,
    });

    if (!findContact)
      return { error: `Não existe um Contato com este ID -> ${id_contact}.` };

    return {
      contact: findContact,
    };
  }
} exports.FindContactService = FindContactService;
