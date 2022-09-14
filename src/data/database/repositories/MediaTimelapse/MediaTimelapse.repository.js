import { resolve } from 'path';
import fs from 'fs';
import { Timelapse_Coordinates, Media_timelapse } from '../../models';
import { folder } from '../../../../config/multer_media_timelapse';

export class MediaTimelapseRepository {
  async createMediaTimelapse(req) {
    const createdMediaTimelapse = await Media_timelapse.create({
      id_timelapse_coordinates: req.body.id,
      dt_media: req.body.dt_media,
      nm_original_file: req.file.originalname,
      nm_file: req.file.filename,
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });
    return createdMediaTimelapse;
  }

  async findMediaTimelapses({ page, limit, id_timelapse_coordinates }) {
    return await Media_timelapse.findAndCountAll({
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
      order: [['dt_media', 'ASC']],
      where: { id_timelapse_coordinates },
      include: [
        id_timelapse_coordinates
          ? {
              model: Timelapse_Coordinates,
              as: 'timelapse_coordinates',
              where: { id_timelapse_coordinates },
            }
          : { model: Timelapse_Coordinates, as: 'timelapse_coordinates' },
      ],
    });
  }

  async deleteMediaTimelapse({ id_media_timelapse }) {
    const media_timelapse = await Media_timelapse.findOne({
      where: {
        id_media_timelapse,
      },
    });

    if (media_timelapse.nm_file) {
      const path = resolve(folder, media_timelapse.nm_file);
      fs.existsSync(path) && fs.unlink(path, e => e);
    }

    await Media_timelapse.destroy({
      where: { id_media_timelapse },
    });
  }

  async findMediaByTimelapseCoordinatesId({ id_timelapse_coordinates }) {
    return await Media_timelapse.findAll({
      order: [['dt_media', 'ASC']],
      include: [
        {
          model: Timelapse_Coordinates,
          as: 'timelapse_coordinates',
          where: { id_timelapse_coordinates },
        },
      ],
    });
  }

  async findMediaTimelapseById({ id_media_timelapse, populate }) {
    if (populate) {
      return await Media_timelapse.findOne({
        where: {
          id_media_timelapse,
        },
        include: [
          {
            model: Timelapse_Coordinates,
            as: 'timelapse_coordinates',
          },
        ],
      });
    }

    return await Media_timelapse.findOne({
      where: {
        id_media_timelapse,
      },
      raw: true,
    });
  }

  async updateMediaTimelapse(id_media_timelapse, req) {
    const media_timelapse = await Media_timelapse.findOne({
      where: {
        id_media_timelapse,
      },
    });

    if (req.file) {
      if (media_timelapse.nm_file) {
        const path = resolve(folder, media_timelapse.nm_file);
        fs.existsSync(path) && fs.unlink(path, e => e);
      }
      await media_timelapse.update({
        nm_original_file: req.file.originalname,
        nm_file: req.file.filename,
      });
    }
    await media_timelapse.update({
      dt_media: req.body.dt_media,
    });

    return await Media_timelapse.findOne({
      where: {
        id_media_timelapse,
      },
    });
  }
}
