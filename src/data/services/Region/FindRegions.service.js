import { RegionRepository } from '../../database/repositories';

export class FindRegionsService {
  async execute({ page, limit, nm_region }) {
    const repository = new RegionRepository();

    const findRegions = await repository.findRegions({
      limit,
      page,
      nm_region,
    });

    if (findRegions.length === 0)
      return { error: 'Não há Regiões registradas.' };

    return {
      regions: findRegions,
    };
  }
}
