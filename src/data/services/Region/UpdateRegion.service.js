import { RegionRepository } from '../../database/repositories';

export class UpdateRegionService {
  async execute({ name, id }) {
    const repository = new RegionRepository();

    const verifyRegionExists = await repository.findRegionById({
      id,
    });

    if (!verifyRegionExists)
      return { error: 'There is no region with this name.' };

    const programUpdated = await repository.updateRegion({
      id,
      name,
    });

    return {
      region: programUpdated,
    };
  }
}
