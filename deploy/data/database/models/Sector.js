"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');

 class Sector extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id_sector: {
          type: _sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nm_sector: _sequelize.DataTypes.STRING,
        dt_created_at: _sequelize.DataTypes.DATE,
        dt_updated_at: _sequelize.DataTypes.DATE,
      },
      {
        tableName: 'sector',
        sequelize,
      }
    );

    return Sector;
  }
} exports.Sector = Sector;
