"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');

 class Location extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id_location: {
          type: _sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        ds_address: _sequelize.DataTypes.STRING(255),
        nu_address: _sequelize.DataTypes.STRING(20),
        ds_district: _sequelize.DataTypes.STRING(255),
        nu_postal_code: _sequelize.DataTypes.CHAR(10),
        nu_latitude: _sequelize.DataTypes.CHAR(20),
        nu_longitude: _sequelize.DataTypes.CHAR(20),
        dt_created_at: _sequelize.DataTypes.DATE,
        dt_updated_at: _sequelize.DataTypes.DATE,
      },
      {
        tableName: 'location',
        sequelize,
      }
    );

    return Location;
  }

  static associate(models) {
    Location.belongsTo(models.Project, {
      foreignKey: 'id_project',
      as: 'project',
    });

    Location.hasMany(models.Polygon_area, {
      foreignKey: 'id_location',
      as: 'polygon_area',
    });
  }
} exports.Location = Location;
