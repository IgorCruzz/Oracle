import { TimelapseRepository } from '../../database/repositories';

export class DeleteTimelapseService {
  async execute({ id_timelapse_coordinates }) {
    const repository = new TimelapseRepository();

    const verifyTimelapseExists = await repository.findTimelapseById({
      id_timelapse_coordinates,
    });

    if (!verifyTimelapseExists)
      return {
        error: `Não há nenhuma coordenada registrada com esse ID -> ${id_timelapse_coordinates}.`,
      };

    await repository.deleteTimelapse({
      id_timelapse_coordinates,
    });

    return {
      message: 'Vistoria excluída com sucesso!',
    };
  }
}
