"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');

 class Jurisdiction extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id_jurisdiction: {
          type: _sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nm_jurisdiction: _sequelize.DataTypes.STRING,
        dt_created_at: _sequelize.DataTypes.DATE,
        dt_updated_at: _sequelize.DataTypes.DATE,
      },
      {
        tableName: 'jurisdiction',
        sequelize,
      }
    );

    return Jurisdiction;
  }
} exports.Jurisdiction = Jurisdiction;
