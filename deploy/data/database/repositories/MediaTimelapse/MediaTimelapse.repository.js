"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _path = require('path');
var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);
var _models = require('../../models');
var _multer_media_timelapse = require('../../../../config/multer_media_timelapse');

 class MediaTimelapseRepository {
  async createMediaTimelapse(req) {
    const createdMediaTimelapse = await _models.Media_timelapse.create({
      id_timelapse_coordinates: req.body.id,
      dt_media: req.body.dt_media,
      nm_original_file: req.file.originalname,
      nm_file: req.file.filename,
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });
    return createdMediaTimelapse;
  }

  async findMediaTimelapses({
    page,
    limit,
    id_timelapse_coordinates,
  }) {

    return await _models.Media_timelapse.findAndCountAll({
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
      order: [['dt_media', 'ASC']],
      where: { id_timelapse_coordinates },
      include: [
        id_timelapse_coordinates
          ? {
              model: _models.Timelapse_Coordinates,
              as: 'timelapse_coordinates',
              where: { id_timelapse_coordinates },
            }
          : { model: _models.Timelapse_Coordinates, as: 'timelapse_coordinates' },
      ],
    });
  }
  async deleteMediaTimelapse({ id_media_timelapse }) {
    const media_timelapse = await _models.Media_timelapse.findOne({
      where: {
        id_media_timelapse,
      },
    });

    if (media_timelapse.nm_file) {
      const path = _path.resolve.call(void 0, _multer_media_timelapse.folder, media_timelapse.nm_file);
      _fs2.default.existsSync(path) && _fs2.default.unlink(path, e => e);
    }

    await _models.Media_timelapse.destroy({
      where: { id_media_timelapse },
    });
  }  

  async findMediaTimelapseById({ id_media_timelapse, populate }) {
    if (populate) {
      return await _models.Media_timelapse.findOne({
        where: {
          id_media_timelapse,
        },
        include: [
          {
            model: _models.Timelapse_Coordinates,
            as: 'timelapse_coordinates',
          },
        ],
      });
    }

    return await _models.Media_timelapse.findOne({
      where: {
        id_media_timelapse,
      },
      raw: true,
    });
  }
  async updateMediaTimelapse(id_media_timelapse, req) {
    const media_timelapse = await _models.Media_timelapse.findOne({
      where: {
        id_media_timelapse,
      },
    });

    if(req.file){
      if (media_timelapse.nm_file) {
        const path = _path.resolve.call(void 0, _multer_media_timelapse.folder, media_timelapse.nm_file);
        _fs2.default.existsSync(path) && _fs2.default.unlink(path, e => e);
      }
      await media_timelapse.update({
        nm_original_file: req.file.originalname,
        nm_file: req.file.filename,
      });      
    }
    await media_timelapse.update({
      dt_media: req.body.dt_media,
    });

    return await _models.Media_timelapse.findOne({
      where: {
        id_media_timelapse,
      },
    });
  }

} exports.MediaTimelapseRepository = MediaTimelapseRepository;
