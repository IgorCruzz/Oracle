import { ContactRepository } from '../../database/repositories';

export class CreateContactService {
  async execute(data) {
    const repository = new ContactRepository();

    const sector = await repository.createContact({ data });

    return {
      message: 'Setor registrado com sucesso!',
      contact: sector.dataValues,
    };
  }
}
