import { TimelapseRepository } from '../../database/repositories';

export class FindCoordinatesService {
  async execute({ id_project_phase }) {
    const repository = new TimelapseRepository();

    const getCoordinates = await repository.findTimelapseByProjectPhaseId({
      id_project_phase,
    });

    const coordinates = getCoordinates.map(
      ({ id_timelapse_coordinates, nu_latitude, nu_longitude }) => ({
        id_timelapse_coordinates,
        nu_latitude,
        nu_longitude,
      })
    );

    return {
      projectPhases: coordinates,
    };
  }
}
