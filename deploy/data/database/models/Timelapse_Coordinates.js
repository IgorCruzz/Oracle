"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');

 class Timelapse_Coordinates extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id_timelapse_coordinates: {
          type: _sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        ds_coordinates: {
          type: _sequelize.DataTypes.STRING(255),
        },
        tp_media: _sequelize.DataTypes.TINYINT(4),
        nu_latitude: _sequelize.DataTypes.CHAR(20),
        nu_longitude: _sequelize.DataTypes.CHAR(20),

        dt_created_at: _sequelize.DataTypes.DATE,
        dt_updated_at: _sequelize.DataTypes.DATE,
      },
      {
        tableName: 'timelapse_coordinates',
        sequelize,
      }
    );

    return Timelapse_Coordinates;
  }

  static associate(models) {
    Timelapse_Coordinates.hasMany(models.Media_timelapse, {
      foreignKey: 'id_timelapse_coordinates',
      as: 'media_timelapse',
    });

    Timelapse_Coordinates.belongsTo(models.Project_phase, {
      foreignKey: 'id_project_phase',
      as: 'project_phase',
    });
  }
} exports.Timelapse_Coordinates = Timelapse_Coordinates;
