import { MediaTimelapseRepository } from '../../database/repositories';

export class FindMediaTimelapsesService {
  async execute({
    page,
    limit,
    id,
    nm_original_file,
    dt_media,
    id_timelapse_coordinates
  }) {
    const repository = new MediaTimelapseRepository();

    const findMediaTimelapses = await repository.findMediaTimelapses({
      page,
      limit,
      id,
      nm_original_file,
      dt_media,
      id_timelapse_coordinates
    });

    if (findMediaTimelapses.length === 0)
      return { error: 'Não há nenhuma media registrada.' };

    return {
      media_timelapses: findMediaTimelapses,
    };
  }
}
