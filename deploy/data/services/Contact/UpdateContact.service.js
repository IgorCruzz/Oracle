"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _repositories = require('../../database/repositories');

 class UpdateContactService {
  async execute(id_contact, data) {
    const { nm_contact, id_project } = data;

    const repository = new (0, _repositories.ContactRepository)();
    const projectRepository = new (0, _repositories.ProjectRepository)();

    const verifyProjectExists = await projectRepository.findProjectById({
      id_project,
    });

    if (!verifyProjectExists || verifyProjectExists.dt_deleted_at)
      return {
        error: `Não há nenhum Projeto registrado com este ID -> ${id_project}.`,
      };

    const verifyContactExists = await repository.findContactById({
      id_contact,
    });

    if (!verifyContactExists)
      return { error: `Não existe um Contato com este ID -> ${id_contact}.` };

    const verifyContactName = await repository.findContact({
      nm_contact,
      id_project,
    });

    if (
      verifyContactName &&
      verifyContactName.id_contact !== Number(id_contact)
    )
      return { error: 'Já existe um Contato registrado com este nome.' };

    const contactUpdated = await repository.updateContact(id_contact, data);

    return {
      message: 'Contato atualizado com sucesso!',
      contact: contactUpdated,
    };
  }
} exports.UpdateContactService = UpdateContactService;
