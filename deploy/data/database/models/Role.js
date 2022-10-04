"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');

 class Role extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id_role: {
          type: _sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nm_role: _sequelize.DataTypes.STRING(255),
        dt_created_at: _sequelize.DataTypes.DATE,
        dt_updated_at: _sequelize.DataTypes.DATE,
      },
      {
        tableName: 'role',
        sequelize,
      }
    );

    return Role;
  }
} exports.Role = Role;
