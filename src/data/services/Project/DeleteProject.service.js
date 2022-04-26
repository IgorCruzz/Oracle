import {
  ProjectRepository,
  LocationRepository,
} from '../../database/repositories';

export class DeleteProjectService {
  async execute({ id_project }) {
    const repository = new ProjectRepository();
    const locationRepository = new LocationRepository();

    const verifyAgencyExists = await repository.findProjectById({
      id_project,
    });

    if (!verifyAgencyExists)
      return {
        error: `Não há nenhum projeto registrado com este ID -> ${id_project}.`,
      };

    const verifyFk = await locationRepository.verifyProject({
      id_project,
    });

    if (verifyFk.length > 0) {
      return {
        error:
          'Não foi possível excluir o Projeto pois existem Localização de Canteiros associadas.',
      };
    }

    await repository.deleteProject({
      id_project,
    });

    return {
      message: 'Projeto excluído com sucesso!',
    };
  }
}
