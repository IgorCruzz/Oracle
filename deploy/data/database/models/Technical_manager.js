"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');

 class Technical_manager extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id_technical_manager: {
          type: _sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nm_technical_manager: _sequelize.DataTypes.STRING(255),
        nu_crea: _sequelize.DataTypes.CHAR(20),
        nu_rrt_art: _sequelize.DataTypes.CHAR(20),
        tp_responsability: _sequelize.DataTypes.TINYINT,
        dt_created_at: _sequelize.DataTypes.DATE,
        dt_updated_at: _sequelize.DataTypes.DATE,
      },
      {
        tableName: 'technical_manager',
        sequelize,
      }
    );

    return Technical_manager;
  }

  static associate(models) {
    Technical_manager.belongsTo(models.Project, {
      foreignKey: 'id_project',
      as: 'project',
    });
  }
} exports.Technical_manager = Technical_manager;
