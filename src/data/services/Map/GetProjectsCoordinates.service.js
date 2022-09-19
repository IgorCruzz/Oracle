import { Op } from 'sequelize';

import {
  Project,
  Project_phase,
  Location,
  Polygon_area,
  Timelapse_Coordinates,
  City,
} from '../../database/models';

export class GetProjectsCoordinatesService {
  async execute({ id_city }) {
    const getLocation = await Project.findAll({
      include: [
        {
          model: Project_phase,
          as: 'project_phase',
        },
        {
          model: City,
          as: 'city',
          where: id_city ? { id_city } : {},
        },
      ],
    });

    const data = Promise.all(
      getLocation.map(async item => {
        const project = item.dataValues;
        const project_phase = project.project_phase;

        const getProjectPhaseIds = project_phase.map(
          projectPhase => projectPhase.dataValues.id_project_phase
        );

        const location = await Location.findAll({
          where: {
            id_project: project.id_project,
          },
          include: [
            {
              model: Polygon_area,
              as: 'polygon_area',
            },
          ],
        });

        const timelapse = await Timelapse_Coordinates.findAll({
          where: {
            id_project_phase: {
              [Op.in]: getProjectPhaseIds,
            },
          },
        });

        const { id_project } = project;

        return {
          id_project,
          location,
          timelapse,
        };
      })
    );

    return {
      projects: await data,
      // projects: getLocation,
    };
  }
}
