import {
  ContactRepository,
  ProjectRepository,
} from '../../database/repositories';

export class CreateContactService {
  async execute(data) {
    const { nm_contact, id_project } = data;

    const repository = new ContactRepository();
    const projectRepository = new ProjectRepository();

    const verifyContactExists = await repository.findContact({
      nm_contact,
      id_project,
    });

    if (verifyContactExists)
      return {
        error:
          'Já existe um Contato registrado com este nome para este projeto.',
      };

    const verifyProjectExists = await projectRepository.findProjectById({
      id_project,
    });

    if (!verifyProjectExists || verifyProjectExists.dt_deleted_at)
      return {
        error: `Não há nenhum Projeto registrado com este ID -> ${id_project}.`,
      };

    const contact = await repository.createContact(data);

    return {
      message: 'Contato adicionado com sucesso!',
      contact: contact.dataValues,
    };
  }
}
