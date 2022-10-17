import { SectorRepository } from '../../database/repositories';

export class CreatePhaseStatusService {
  async execute({ ds_status }) {
    const repository = new SectorRepository();

    const verifySectorExists = await repository.findSector({
      ds_status,
    });

    if (verifySectorExists)
      return { error: 'Já existe um Setor registrado com este nome.' };

    const sector = await repository.createSector({ ds_status });

    return {
      message: 'Status registrado com sucesso!',
      sector: sector.dataValues,
    };
  }
}
