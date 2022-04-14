import { RegionRepository } from '../../database/repositories';

export class FindRegionsService {
  async execute({ page, limit }) {
    const repository = new RegionRepository();

    const findRegions = await repository.findRegions({
      limit,
      page,
    });

    if (findRegions.length === 0)
      return { error: 'Não há regiões registradas.' };

    return {
      regions: findRegions,
    };
  }
}
