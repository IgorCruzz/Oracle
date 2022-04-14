import { CityRepository, RegionRepository } from '../../database/repositories';

export class CreateCityService {
  async execute({ name, regionId }) {
    const repository = new CityRepository();
    const regionRepository = new RegionRepository();

    const verifyRegionExists = await regionRepository.findRegionById({
      id: regionId,
    });

    if (!verifyRegionExists)
      return {
        error: `Não existe uma região registrada com este ID -> ${regionId}.`,
      };

    const verifyCityExists = await repository.findCity({
      name,
    });

    if (verifyCityExists)
      return { error: 'Já foi registrado um município com este nome.' };

    await repository.createCity({ name, regionId });

    return {
      message: 'Município registrado com sucesso!',
    };
  }
}
