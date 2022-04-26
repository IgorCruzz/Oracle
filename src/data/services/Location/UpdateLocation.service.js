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

      if (!projectExists) {
        return {
          error: `Não há nenhum Projeto registrado com este ID -> ${id_project}.`,
        };
      }
    }

    const LocationUpdated = await repository.updateProject(id_location, data);

    return {
      message: 'Localização de Canteiro atualizada com sucesso!',
      location: LocationUpdated,
    };
  }
}
