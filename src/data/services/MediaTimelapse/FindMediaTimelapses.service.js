import { MediaTimelapseRepository } from '../../database/repositories';

export class FindMediaTimelapsesService {
  async execute({
    page,
    limit,
    id,
    nm_original_file,
    dt_media,
<<<<<<< HEAD
    id_timelapse_coordinates
=======
    id_timelapse_coordinates,
>>>>>>> main
  }) {
    const repository = new MediaTimelapseRepository();

    const findMediaTimelapses = await repository.findMediaTimelapses({
      page,
      limit,
      id,
      nm_original_file,
      dt_media,
<<<<<<< HEAD
      id_timelapse_coordinates
=======
      id_timelapse_coordinates,
>>>>>>> main
    });

    if (findMediaTimelapses.length === 0)
      return { error: 'Não há nenhuma media registrada.' };

    return {
      media_timelapses: findMediaTimelapses,
    };
  }
}
