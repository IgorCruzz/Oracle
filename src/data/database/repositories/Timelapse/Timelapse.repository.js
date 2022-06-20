import { Op } from 'sequelize';
import {
  Timelapse_Coordinates as Timelapse,
  Project_phase,
  Media_timelapse,
} from '../../models';
import { MediaTimelapseRepository } from '../MediaTimelapse/MediaTimelapse.repository';

export class TimelapseRepository {
  async createTimelapse(data) {
    const {
      ds_coordinates,
      tp_media,
      nu_latitude,
      nu_longetude,
      id_project_phase,
    } = data;

    const createdTimelapse = await Timelapse.create({
      ...data,
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });
    return createdTimelapse;
  }

  async findTimelapses({
    page,
    limit,
    id_project_phase,
  }) {
    return await Timelapse.findAndCountAll({
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
      order: [['dt_created_at', 'ASC']],
      where: { id_project_phase },
      include: [
        id_project_phase
          ? {
              model: Project_phase,
              as: 'project_phase',
              where: { id_project_phase },
            }
          : { model: Project_phase, as: 'project_phase' },
      ],
    });
  }
  async findTimelapseById({ id_timelapse_coordinates, populate }) {
    if (populate) {
      return await Timelapse.findOne({
        where: {
          id_timelapse_coordinates,
        },
        include: [
          {
            model: Project_phase,
            as: 'project_phase',
          },
          {
            model: Media_timelapse,
            as: 'media_timelapse',
          },
        ],
      });
    }

    return await Timelapse.findOne({
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

    const mediaTimelapseRepository = new MediaTimelapseRepository();
    await Promise.all(
      timelapse.media_timelapse.map(async obj => {
        await mediaTimelapseRepository.deleteMediaTimelapse({
          id_media_timelapse: obj.id_media_timelapse,
        });
      })
    );

    await Timelapse.destroy({
      where: { id_timelapse_coordinates },
    });
  }
  
  async updateTimelapse(id_timelapse_coordinates, data) {
    console.log(data);
    const { ds_coordinates, tp_media, nu_latitude, nu_longitude } = data;

    const timelapse = await Timelapse.findOne({
      where: {
        id_timelapse_coordinates,
      },
    });

    await timelapse.update({
      ...data,
    });

    return await Timelapse.findOne({
      where: {
        id_timelapse_coordinates,
      },
      include: [
        {
          model: Project_phase,
          as: 'project_phase',
        },
      ],
    });
  }
}
