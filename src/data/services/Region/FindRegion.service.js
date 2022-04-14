import { RegionRepository } from '../../database/repositories';

export class FindRegionService {
  async execute({ id }) {
    const repository = new RegionRepository();

    const findRegion = await repository.findRegionById({
      id,
    });

    if (!findRegion)
      return {
        error: `Não existe uma região registrada com este ID -> ${id}.`,
      };

    return {
      region: findRegion,
    };
  }
}
