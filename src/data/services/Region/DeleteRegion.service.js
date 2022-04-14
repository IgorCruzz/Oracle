import { RegionRepository } from '../../database/repositories';

export class DeleteRegionService {
  async execute({ id }) {
    const repository = new RegionRepository();

    const verifyRegionExists = await repository.findRegionById({
      id,
    });

    if (!verifyRegionExists)
      return {
        error: `Não existe uma região registrada com este ID -> ${id}.`,
      };

    await repository.deleteRegion({
      id,
    });

    return {
      message: 'Região deleteda com sucesso!',
    };
  }
}
