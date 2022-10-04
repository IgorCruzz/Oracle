"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');








var _models = require('../../database/models');

 class GetProjectsCoordinatesFromCityService {
  async execute({ id_city }) {
    const getLocation = await _models.Project.findAll({
      include: [
        {
          model: _models.Project_phase,
          as: 'project_phase',
        },
        {
          model: _models.City,
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

        const location = await _models.Location.findAll({
          where: {
            id_project: project.id_project,
          },
          include: [
            {
              model: _models.Polygon_area,
              as: 'polygon_area',
            },
          ],
        });

        const timelapse = await _models.Timelapse_Coordinates.findAll({
          where: {
            id_project_phase: {
              [_sequelize.Op.in]: getProjectPhaseIds,
            },
          },
        });

        const { id_project, nm_project } = project;

        return {
          nm_project,
          id_project,
          location,
          timelapse,
        };
      })
    );

    return {
      projects: await data,
    };
  }
} exports.GetProjectsCoordinatesFromCityService = GetProjectsCoordinatesFromCityService;
