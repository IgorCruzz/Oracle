<<<<<<< HEAD
import {
  TimelapseRepository,
} from '../../database/repositories';

export class UpdateTimelapseService {
  async execute(id_timelapse_coordinates, data) {
    const { ds_coordinates, tp_media, nu_latitude, nu_longitude } = data;

=======
import { TimelapseRepository } from '../../database/repositories';

export class UpdateTimelapseService {
  async execute(id_timelapse_coordinates, data) {
>>>>>>> main
    const timelapseRepository = new TimelapseRepository();

    const timelapseExists = await timelapseRepository.findTimelapseById({
      id_timelapse_coordinates,
      populate: false,
    });

    if (!timelapseExists) {
      return {
        error: `Não há nenhuma coordenadas registrada com este ID -> ${id_timelapse_coordinates}.`,
      };
    }

<<<<<<< HEAD
    const timelapse = await timelapseRepository.updateTimelapse(id_timelapse_coordinates, data);
=======
    const timelapse = await timelapseRepository.updateTimelapse(
      id_timelapse_coordinates,
      data
    );
>>>>>>> main

    if (timelapse.error) {
      return { error: timelapse.error };
    }

    return {
      message: 'Coordenada atualizada com sucesso!',
      timelapse,
    };
  }
}
