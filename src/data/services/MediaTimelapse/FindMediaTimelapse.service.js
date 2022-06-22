import { MediaTimelapseRepository } from '../../database/repositories';

export class FindMediaTimelapseService {
  async execute({ id_media_timelapse }) {
    const repository = new MediaTimelapseRepository();

    const findMediaTimelapse = await repository.findMediaTimelapseById({
      id_media_timelapse,
      populate: true,
    });

    if (!findMediaTimelapse)
      return {
        error: `Não há nenhuma media registrada com este ID -> ${id_media_timelapse}.`,
      };

    return {
      media_lapse: findMediaTimelapse,
    };
  }
}
