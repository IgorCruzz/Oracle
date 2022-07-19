import { SectorRepository } from '../../database/repositories';

export class CreateContactService {
  async execute({ nm_sector }) {
    const repository = new SectorRepository();

    const verifySectorExists = await repository.findSector({
      nm_sector,
    });

    if (verifySectorExists)
      return { error: 'Já existe um Setor registrado com este nome.' };

    const sector = await repository.createSector({ nm_sector });

    return {
      message: 'Setor registrado com sucesso!',
      contact: sector.dataValues,
    };
  }
}
