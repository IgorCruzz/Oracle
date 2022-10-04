"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');

 class Contact extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id_contact: {
          type: _sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nm_contact: _sequelize.DataTypes.STRING(100),
        nu_phone: _sequelize.DataTypes.STRING(100),
        ds_email: _sequelize.DataTypes.STRING(100),
        tx_remark: _sequelize.DataTypes.STRING(1000),

        dt_created_at: _sequelize.DataTypes.DATE,
        dt_updated_at: _sequelize.DataTypes.DATE,
      },
      {
        tableName: 'contact',
        sequelize,
      }
    );

    return Contact;
  }

  static associate(models) {
    Contact.belongsTo(models.Project, {
      foreignKey: 'id_project',
      as: 'project',
    });
  }
} exports.Contact = Contact;
