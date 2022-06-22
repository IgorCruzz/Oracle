import { MediaTimelapseRepository } from '../../database/repositories';

export class UpdateMediaTimelapseService {
  async execute(id_media_timelapse, req) {
<<<<<<< HEAD

    const repository = new MediaTimelapseRepository();
    const MediaTimelapseUpdated = await repository.updateMediaTimelapse(id_media_timelapse, req);
=======
    const repository = new MediaTimelapseRepository();
    const MediaTimelapseUpdated = await repository.updateMediaTimelapse(
      id_media_timelapse,
      req
    );
>>>>>>> main

    if (MediaTimelapseUpdated.error) {
      return { error: MediaTimelapseUpdated.error };
    }
    return {
      message: 'Media salvo com sucesso!',
      media_timelapse: MediaTimelapseUpdated,
    };
  }
}
