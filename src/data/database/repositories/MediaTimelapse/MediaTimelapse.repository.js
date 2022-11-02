import { resolve } from 'path';
import fs from 'fs';
import utf8 from 'utf8';
import aws from 'aws-sdk';
import { Timelapse_Coordinates, Media_timelapse } from '../../models';
import { folder } from '../../../../config/multer_media_timelapse';

aws.config.update({
  accessKeyId: 'DO0098U9A8D6HJZNNT6R',
  secretAccessKey: '83GJZKHnCH57T3obii3FW6qFcGTKS2a3FgumIM7GcZs',
});

const spacesEndpoint = new aws.Endpoint('sfo3.digitaloceanspaces.com');

const s3 = new aws.S3({
  endpoint: spacesEndpoint,
});

export class MediaTimelapseRepository {
  async createMediaTimelapse(req) {
    const createdMediaTimelapse = await Media_timelapse.create({
      id_timelapse_coordinates: req.body.id,
      dt_media: req.body.dt_media,
      nm_original_file: utf8.decode(req.file.originalname),
      nm_file: req.file.key,
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
      s3.deleteObject(
        {
          Bucket: 'gerobras-development',
          Key: `media_timelapses/${media_timelapse.nm_file}`,
        },
        (err, data) => {
          if (err) return console.log(err);

          console.log(data);
        }
      );
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
        s3.deleteObject(
          {
            Bucket: 'gerobras-development',
            Key: `media_timelapses/${media_timelapse.nm_file}`,
          },
          (err, data) => {
            if (err) return console.log(err);

            console.log(data);
          }
        );
      }
      await media_timelapse.update({
        nm_original_file: utf8.decode(req.file.originalname),
        nm_file: req.file.key,
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
