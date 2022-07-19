import { SectorRepository } from '../../database/repositories';

export class FindContactService {
  async execute({ id_sector }) {
    const repository = new SectorRepository();

    const findSector = await repository.findSectorById({
      id_sector,
    });

    if (!findSector)
      return { error: `Não existe um Setor com este ID -> ${id_sector}.` };

    return {
      contact: findSector,
    };
  }
}
