import { TimelapseRepository } from '../../database/repositories';

export class FindTimelapseService {
  async execute({ id_timelapse_coordinates }) {
    const repository = new TimelapseRepository();

    const findTimelapse = await repository.findTimelapseById({
      id_timelapse_coordinates,
      populate: true,
    });

    if (!findTimelapse)
      return {
        error: `Não há nenhuma coordenada registrada com este ID -> ${id_timelapse_coordinates}.`,
      };

    return {
      timelapse: findTimelapse,
    };
  }
}
