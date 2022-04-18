import { CityRepository, RegionRepository } from '../../database/repositories';

export class UpdateCityService {
  async execute({ name, id, region }) {
    const repository = new CityRepository();
    const regionRepository = new RegionRepository();

    if (region) {
      const { regionName, regionId } = region;

      const verifyRelation = await repository.verifyRelation({
        regionId,
        id,
      });

      if (verifyRelation.length === 0) {
        return {
          error:
            'A região solicitada não existe ou não possui relação com o Município!',
        };
      }

      const verifyJurisdictionName = await regionRepository.findRegion({
        name: regionName,
      });

      if (verifyJurisdictionName)
        return { error: 'Já existe uma esfera com este nome registrado.' };

      await regionRepository.updateRegion({
        id: regionId,
        name: regionName,
      });
    }

    const verifyCitiesExists = await repository.findCityById({
      id,
    });

    if (!verifyCitiesExists)
      return {
        error: `Não existe um município registrado com este ID -> ${id}.`,
      };

    const verifyCityName = await repository.findCity({
      name,
    });

    if (verifyCityName)
      return { error: 'Já foi registrado um município com este nome.' };

    const cityUpdated = await repository.updateCity({
      id,
      name,
    });

    return {
      message: 'Município atualizado com sucesso!',
      city: cityUpdated,
    };
  }
}
