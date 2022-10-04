"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _moment = require('moment'); var _moment2 = _interopRequireDefault(_moment);

 class Media_timelapse extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id_media_timelapse: {
          type: _sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        dt_media: {
          type: _sequelize.DataTypes.DATEONLY,
          get() {
            const value = this.getDataValue('dt_media');

            return value === null
              ? null
              : _moment2.default.utc(this.getDataValue('dt_media')).format('YYYY-MM-DD');
          },
        },
        nm_original_file: {
          type: _sequelize.DataTypes.STRING(1000),
        },
        nm_file: {
          type: _sequelize.DataTypes.STRING(1000),
        },
        dt_created_at: _sequelize.DataTypes.DATE,
        dt_updated_at: _sequelize.DataTypes.DATE,
      },
      {
        tableName: 'media_timelapse',
        sequelize,
      }
    );

    return Media_timelapse;
  }

  static associate(models) {
    Media_timelapse.belongsTo(models.Timelapse_Coordinates, {
      foreignKey: 'id_timelapse_coordinates',
      as: 'timelapse_coordinates',
    });
  }
} exports.Media_timelapse = Media_timelapse;
