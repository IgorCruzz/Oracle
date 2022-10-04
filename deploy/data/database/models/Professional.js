"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');

 class Professional extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id_professional: {
          type: _sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nm_professional: _sequelize.DataTypes.STRING,
        in_delivery_analyst: _sequelize.DataTypes.CHAR(1),
        in_active: _sequelize.DataTypes.CHAR(1),
        dt_created_at: _sequelize.DataTypes.DATE,
        dt_updated_at: _sequelize.DataTypes.DATE,
      },
      {
        tableName: 'professional',
        sequelize,
      }
    );

    return Professional;
  }

  static associate(models) {
    Professional.hasMany(models.Allocation, {
      foreignKey: 'id_professional',
      as: 'allocation',
    });

    Professional.hasMany(models.Product_history, {
      foreignKey: 'id_professional',
      as: 'product_history',
    });

    Professional.belongsTo(models.Role_grade, {
      foreignKey: 'id_role_grade',
      as: 'coustHH',
    });
    Professional.belongsTo(models.Sector, {
      foreignKey: 'id_sector',
      as: 'sector',
    });
    Professional.belongsTo(models.User, {
      foreignKey: 'id_user',
      as: 'user',
    });
    Professional.hasMany(models.Inspection, {
      foreignKey: 'id_inspection',
      as: 'inspection',
    });
  }
} exports.Professional = Professional;
