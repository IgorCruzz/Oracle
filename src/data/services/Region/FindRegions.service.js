import { RegionRepository } from '../../database/repositories';

export class FindRegionsService {
  async execute({ page, limit, search }) {
    const repository = new RegionRepository();

    const findRegions = await repository.findRegions({
      limit,
      page,
      search,
    });

    if (findRegions.length === 0)
      return { error: 'Não há Regiões registradas.' };

    return {
      regions: findRegions,
    };
  }
}
