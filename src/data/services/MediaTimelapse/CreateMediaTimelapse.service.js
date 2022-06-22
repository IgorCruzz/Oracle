import {
<<<<<<< HEAD
  MediaTimelapseRepository, 
  TimelapseRepository
=======
  MediaTimelapseRepository,
  TimelapseRepository,
>>>>>>> main
} from '../../database/repositories';

export class CreateMediaTimelapseService {
  async execute(req) {
<<<<<<< HEAD

    const repository = new MediaTimelapseRepository();
    const timelapseRepository = new TimelapseRepository();

    const timelapseCoordinatesExists = await timelapseRepository.findTimelapseById({
      id_timelapse_coordinates: req.body.id, 
      populate: false
    });
=======
    const repository = new MediaTimelapseRepository();
    const timelapseRepository = new TimelapseRepository();

    const timelapseCoordinatesExists = await timelapseRepository.findTimelapseById(
      {
        id_timelapse_coordinates: req.body.id,
        populate: false,
      }
    );
>>>>>>> main
    if (!timelapseCoordinatesExists) {
      return {
        error: `Não há nenhuma coordenada registrada com este ID -> ${id_timelapse_coordinates}.`,
      };
    }
    const media_timelapse = await repository.createMediaTimelapse(req);

    if (media_timelapse.error) {
      return { error: media_timelapse.error };
    }

    return {
      message: 'Media adicionada com sucesso!',
      media_timelapse,
    };
  }
}
