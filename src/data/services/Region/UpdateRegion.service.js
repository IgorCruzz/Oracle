import { RegionRepository } from '../../database/repositories';

export class UpdateRegionService {
  async execute({ name, id }) {
    const repository = new RegionRepository();

    const verifyRegionExists = await repository.findRegionById({
      id,
    });

    if (!verifyRegionExists)
      return {
        error: `Não existe uma região registrada com este ID -> ${id}.`,
      };

    const programUpdated = await repository.updateRegion({
      id,
      name,
    });

    return {
      region: programUpdated,
    };
  }
}
