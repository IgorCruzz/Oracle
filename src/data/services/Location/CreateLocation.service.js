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

    if (!verifyProjectExists || verifyProjectExists.dt_deleted_at)
      return {
        error: `Não há nenhum Projeto registrado com este ID -> ${id_project}.`,
      };

    const verifyLocationExists = await repository.findLocation(data);

    if (verifyLocationExists) {
      return {
        error: 'Já existe uma Localização da Obra com este endereço.',
      };
    }

    const location = await repository.createLocation(data);

    return {
      message: 'Localização da Obra registrada com sucesso!',
      location,
    };
  }
}
