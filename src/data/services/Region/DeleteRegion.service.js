import { RegionRepository } from '../../database/repositories';

export class DeleteRegionService {
  async execute({ id }) {
    const repository = new RegionRepository();

    const verifyRegionExists = await repository.findRegionById({
      id,
    });

    if (!verifyRegionExists)
      return { error: 'There is no region with this name.' };

    await repository.deleteRegion({
      id,
    });

    return {
      message: 'Region deleted successfully!',
    };
  }
}
