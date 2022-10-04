"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');

 class Polygon_area extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id_polygon_area: {
          type: _sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nu_latidude_vertice: _sequelize.DataTypes.CHAR(20),
        nu_longitude_vertice: _sequelize.DataTypes.CHAR(20),
        dt_created_at: _sequelize.DataTypes.DATE,
        dt_updated_at: _sequelize.DataTypes.DATE,
      },
      {
        tableName: 'polygon_area',
        sequelize,
      }
    );

    return Polygon_area;
  }

  static associate(models) {
    Polygon_area.belongsTo(models.Location, {
      foreignKey: 'id_location',
      as: 'location',
    });
  }
} exports.Polygon_area = Polygon_area;
