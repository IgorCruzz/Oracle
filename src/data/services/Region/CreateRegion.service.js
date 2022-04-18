import { RegionRepository } from '../../database/repositories';

export class CreateRegionService {
  async execute({ name }) {
    const repository = new RegionRepository();

    const verifyRegionExists = await repository.findRegion({
      name,
    });

    if (verifyRegionExists)
      return { error: 'Já existe uma região registrada com este nome.' };

    const region = await repository.createRegion({ name });

    return {
      message: 'Região registrada com sucesso!',
      region,
    };
  }
}
