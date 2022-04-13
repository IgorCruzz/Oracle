import { RegionRepository } from '../../database/repositories';

export class CreateRegionService {
  async execute({ name }) {
    const repository = new RegionRepository();

    const verifyRegionExists = await repository.findRegion({
      name,
    });

    if (verifyRegionExists)
      return { error: 'A region with this name already exists.' };

    await repository.createRegion({ name });

    return {
      message: 'Region created succesfully!',
    };
  }
}
