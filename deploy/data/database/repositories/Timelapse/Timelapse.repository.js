"use strict";Object.defineProperty(exports, "__esModule", {value: true});




var _models = require('../../models');
var _MediaTimelapserepository = require('../MediaTimelapse/MediaTimelapse.repository');

 class TimelapseRepository {
  async createTimelapse(data) {
    const createdTimelapse = await _models.Timelapse_Coordinates.create({
      ...data,
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });
    return createdTimelapse;
  }

  async findTimelapses({ page, limit, id_project_phase }) {
    return await _models.Timelapse_Coordinates.findAndCountAll({
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
      order: [['dt_created_at', 'ASC']],
      where: { id_project_phase },
      include: [
        id_project_phase
          ? {
              model: _models.Project_phase,
              as: 'project_phase',
              where: { id_project_phase },
            }
          : { model: _models.Project_phase, as: 'project_phase' },
      ],
    });
  }

  async findTimelapseByProjectPhaseId({ id_project_phase }) {
    return await _models.Timelapse_Coordinates.findAll({
      include: [
        {
          required: true,
          model: _models.Media_timelapse,
          as: 'media_timelapse',
        },
        {
          required: true,
          model: _models.Project_phase,
          as: 'project_phase',
          where: {
            id_project_phase,
          },
          include: [
            {
              required: true,
              model: _models.Project,
              as: 'project',
            },
          ],
        },
      ],
    });
  }

  async findTimelapseByProjectId({ id_project }) {
    return await _models.Timelapse_Coordinates.findAll({
      include: [
        {
          required: true,
          model: _models.Media_timelapse,
          as: 'media_timelapse',
        },
        {
          required: true,
          model: _models.Project_phase,
          as: 'project_phase',
          include: [
            {
              required: true,
              model: _models.Project,
              as: 'project',
              where: {
                id_project,
              },
            },
          ],
        },
      ],
    });
  }

  async findTimelapseById({ id_timelapse_coordinates, populate }) {
    if (populate) {
      return await _models.Timelapse_Coordinates.findOne({
        where: {
          id_timelapse_coordinates,
        },
        include: [
          {
            model: _models.Project_phase,
            as: 'project_phase',
          },
          {
            model: _models.Media_timelapse,
            as: 'media_timelapse',
          },
        ],
      });
    }

    return await _models.Timelapse_Coordinates.findOne({
      where: {
        id_timelapse_coordinates,
      },
      raw: true,
    });
  }

  async deleteTimelapse({ id_timelapse_coordinates }) {
    const timelapse = await this.findTimelapseById({
      id_timelapse_coordinates,
      populate: true,
    });

    const mediaTimelapseRepository = new (0, _MediaTimelapserepository.MediaTimelapseRepository)();
    await Promise.all(
      timelapse.media_timelapse.map(async obj => {
        await mediaTimelapseRepository.deleteMediaTimelapse({
          id_media_timelapse: obj.id_media_timelapse,
        });
      })
    );

    await _models.Timelapse_Coordinates.destroy({
      where: { id_timelapse_coordinates },
    });
  }

  async updateTimelapse(id_timelapse_coordinates, data) {
    const timelapse = await _models.Timelapse_Coordinates.findOne({
      where: {
        id_timelapse_coordinates,
      },
    });

    await timelapse.update({
      ...data,
    });

    return await _models.Timelapse_Coordinates.findOne({
      where: {
        id_timelapse_coordinates,
      },
      include: [
        {
          model: _models.Project_phase,
          as: 'project_phase',
        },
      ],
    });
  }
} exports.TimelapseRepository = TimelapseRepository;
