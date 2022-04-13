import { CityRepository, RegionRepository } from '../../database/repositories';

export class CreateCityService {
  async execute({ name, regionId }) {
    const repository = new CityRepository();
    const regionRepository = new RegionRepository();

    const verifyRegionExists = await regionRepository.findRegionById({
      id: regionId,
    });

    if (!verifyRegionExists)
      return { error: 'There is no region with this ID.' };
    const verifyCityExists = await repository.findCity({
      name,
    });

    if (verifyCityExists)
      return { error: 'A city with this name already exists.' };

    await repository.createCity({ name, regionId });

    return {
      message: 'City created succesfully!',
    };
  }
}
