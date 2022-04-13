import { RegionRepository } from '../../database/repositories';

export class FindRegionService {
  async execute({ page, limit }) {
    const repository = new RegionRepository();

    const findRegions = await repository.findRegions({
      limit,
      page,
    });

    if (findRegions.length === 0)
      return { error: 'There are no registered regions.' };

    return {
      regions: findRegions,
    };
  }
}
