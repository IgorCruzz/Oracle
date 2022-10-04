"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');

 class Region extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id_region: {
          type: _sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nm_region: _sequelize.DataTypes.STRING,
        dt_created_at: _sequelize.DataTypes.DATE,
        dt_updated_at: _sequelize.DataTypes.DATE,
      },
      {
        tableName: 'region',
        sequelize,
      }
    );

    return Region;
  }
} exports.Region = Region;
