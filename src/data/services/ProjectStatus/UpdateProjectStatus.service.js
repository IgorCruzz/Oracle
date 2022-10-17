import { SectorRepository } from '../../database/repositories';

export class UpdateProjectStatusService {
  async execute(id_sector, data) {
    const { nm_sector } = data;

    const repository = new SectorRepository();

    const verifySectorExists = await repository.findSectorById({
      id_sector,
    });

    if (!verifySectorExists)
      return { error: `Não existe um Setor com este ID -> ${id_sector}.` };

    const verifySectorName = await repository.findSector({
      nm_sector,
    });

    if (verifySectorName && verifySectorName.id_sector !== Number(id_sector))
      return { error: 'Já existe um Setor registrado com este nome.' };

    const sectorUpdated = await repository.updateSector(id_sector, data);

    return {
      message: 'Setor atualizado com sucesso!',
      sector: sectorUpdated,
    };
  }
}
