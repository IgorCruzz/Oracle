import { SectorRepository } from '../../database/repositories';

export class DeleteSectorService {
  async execute({ id_sector }) {
    const repository = new SectorRepository();

    const verifySectorExists = await repository.findSectorById({
      id_sector,
    });

    if (!verifySectorExists)
      return { error: `Não existe um Setor com este ID -> ${id_sector}.` };

    await repository.createSector({
      id_sector,
    });

    return {
      message: 'Setor excluído com sucesso!',
    };
  }
}
