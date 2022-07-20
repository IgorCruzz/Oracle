import { ContactRepository } from '../../database/repositories';

export class DeleteContactService {
  async execute({ id_contact }) {
    const repository = new ContactRepository();

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
}
