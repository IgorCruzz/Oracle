import {
  LocationRepository,
  ProjectRepository,
} from '../../database/repositories';

export class UpdateLocationService {
  async execute(id_location, data) {
    const { id_project } = data;

    const repository = new LocationRepository();
    const projectRepository = new ProjectRepository();

    if (id_project) {
      const projectExists = await projectRepository.findProjectById({
        id_project,
      });

      if (!projectExists || projectExists.dt_deleted_at) {
        return {
          error: `Não há nenhum Projeto registrado com este ID -> ${id_project}.`,
        };
      }
    }

    const verifyLocationId = await repository.findLocationById({
      id_location,
    });

    if (!verifyLocationId) {
      return {
        error: `Não há nenhuma Localização de Canteiro registrada com este ID -> ${id_location}.`,
      };
    }

    const verifyLocationExists = await repository.findLocation(data);

    if (
      verifyLocationExists &&
      verifyLocationExists.id_location !== Number(id_location)
    ) {
      return {
        error: 'Já existe uma Localização de Canteiro com este endereço.',
      };
    }

    const LocationUpdated = await repository.updateLocation(id_location, data);

    return {
      message: 'Localização de Canteiro atualizada com sucesso!',
      location: LocationUpdated,
    };
  }
}
