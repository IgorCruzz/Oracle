import { Op } from 'sequelize';

import {
  Project,
  Project_phase,
  Location,
  Polygon_area,
  Timelapse_Coordinates,
} from '../../database/models';

export class GetProjectsCoordinatesService {
  async execute({ nm_project, nm_city, id_category, tp_project_phase }) {
    const getLocation = await Project.findAll({
      include: [
        {
          model: Project_phase,
          as: 'project_phase',
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
