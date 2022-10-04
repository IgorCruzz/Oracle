"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');

 class Bi_log extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id_bi_log: {
          type: _sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        dt_request: _sequelize.DataTypes.DATE,
        nu_ip_request: _sequelize.DataTypes.STRING,
      },
      {
        tableName: 'bi_log',
        sequelize,
      }
    );

    return Bi_log;
  }

  static associate(models) {
    Bi_log.belongsTo(models.Bi_configuration, {
      foreignKey: 'id_bi_configuration',
      as: 'bi_configuration',
    });
  }
} exports.Bi_log = Bi_log;
