import { ContactRepository } from '../../database/repositories';

export class FindContactService {
  async execute({ id_sector }) {
    const repository = new ContactRepository();

    const findSector = await repository.findContactById({
      id_sector,
    });

    if (!findSector)
      return { error: `Não existe um Setor com este ID -> ${id_sector}.` };

    return {
      contact: findSector,
    };
  }
}
