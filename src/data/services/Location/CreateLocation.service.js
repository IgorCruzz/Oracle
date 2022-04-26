import {
  LocationRepository,
  ProjectRepository,
} from '../../database/repositories';

export class CreateLocationService {
  async execute(data) {
    const { id_project } = data;

    const repository = new LocationRepository();
    const projectRepository = new ProjectRepository();

    const verifyProjectExists = await projectRepository.findProjectById({
      id_project,
    });

    if (!verifyProjectExists)
      return {
        error: `Não há nenhum projeto registrado com este ID -> ${id_project}.`,
      };

    const location = await repository.createLocation(data);

    return {
      message: 'Localização de Canteiro registrada com sucesso!',
      location,
    };
  }
}
