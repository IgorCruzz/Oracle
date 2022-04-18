import { RegionRepository, CityRepository } from '../../database/repositories';

export class DeleteRegionService {
  async execute({ id }) {
    const repository = new RegionRepository();
    const cityRepository = new CityRepository();

    const verifyRegionExists = await repository.findRegionById({
      id,
    });

    if (!verifyRegionExists)
      return {
        error: `Não existe uma região registrada com este ID -> ${id}.`,
      };

    const verifyFk = await cityRepository.verifyRegion({ regionId: id });

    if (verifyFk.length > 0) {
      return {
        error:
          'Não foi possível excluir a Região pois existem Municípios associados.',
      };
    }

    await repository.deleteRegion({
      id,
    });

    return {
      message: 'Região excluída com sucesso!',
    };
  }
}
