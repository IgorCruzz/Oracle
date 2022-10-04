"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');

 class Bi_configuration extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id_bi_configuration: {
          type: _sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nm_bi: _sequelize.DataTypes.STRING,
        cd_bi_token: _sequelize.DataTypes.STRING,
      },
      {
        tableName: 'bi_configuration',
        sequelize,
      }
    );

    return Bi_configuration;
  }
} exports.Bi_configuration = Bi_configuration;
