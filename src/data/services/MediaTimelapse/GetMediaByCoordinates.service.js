import { MediaTimelapseRepository } from '../../database/repositories';

export class GetMediaByCoordinatesService {
  async execute({ id_timelapse_coordinates }) {
    const repository = new MediaTimelapseRepository();

    const medias = await repository.findMediaByTimelapseCoordinatesId({
      id_timelapse_coordinates,
    });

    return {
      projectPhases: medias,
    };
  }
}
