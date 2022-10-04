"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');
var _User = require('./User');

 class Password_recovery extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id_user: {
          type: _sequelize.DataTypes.INTEGER,
          references: {
            model: _User.User,
            key: 'id_user',
          },
          primaryKey: true,
        },
        cd_recovery: _sequelize.DataTypes.STRING(10),
        dt_created_at: _sequelize.DataTypes.DATE,
        dt_updated_at: _sequelize.DataTypes.DATE,
      },
      {
        tableName: 'password_recovery',
        sequelize,
      }
    );

    return Password_recovery;
  }
} exports.Password_recovery = Password_recovery;
