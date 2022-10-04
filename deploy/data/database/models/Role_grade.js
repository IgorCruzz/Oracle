"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');

 class Role_grade extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id_role_grade: {
          type: _sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        vl_salary: {
          type: _sequelize.DataTypes.STRING,
          // get() {
          //   return this.getDataValue('vl_salary').toFixed(2);
          // },
        },
        vl_hour_cost: {
          type: _sequelize.DataTypes.DECIMAL(20, 2),
          // get() {
          //   return this.getDataValue('vl_salary').toFixed(2);
          // },
        },
        dt_created_at: _sequelize.DataTypes.DATE,
        dt_updated_at: _sequelize.DataTypes.DATE,
      },
      {
        tableName: 'role_grade',
        sequelize,
      }
    );

    return Role_grade;
  }

  static associate(models) {
    Role_grade.belongsTo(models.Role, {
      foreignKey: 'id_role',
      as: 'role',
    });

    Role_grade.belongsTo(models.Grade, {
      foreignKey: 'id_grade',
      as: 'grade',
    });
  }
} exports.Role_grade = Role_grade;
