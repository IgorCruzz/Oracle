import { CityRepository, ProjectRepository } from '../../database/repositories';

export class DeleteCityService {
  async execute({ id }) {
    const repository = new CityRepository();
    const projectRepository = new ProjectRepository();

    const verifyCityExists = await repository.findCityById({
      id,
    });

    if (!verifyCityExists)
      return {
        error: `Não existe um município registrado com este ID -> ${id}.`,
      };

    const verifyFk = await projectRepository.verifyRelationCity({
      id_city: id,
    });

    if (verifyFk.length > 0) {
      return {
        error:
          'Não foi possível excluir o Município pois existem Projetos associados.',
      };
    }

    await repository.deleteCity({
      id,
    });

    return {
      message: 'Município excluído com sucesso!',
    };
  }
}
