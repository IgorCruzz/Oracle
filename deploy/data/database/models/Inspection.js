"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _moment = require('moment'); var _moment2 = _interopRequireDefault(_moment);

 class Inspection extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id_inspection: {
          type: _sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        dt_inspection: {
          type: _sequelize.DataTypes.DATEONLY,
          get() {
            const value = this.getDataValue('dt_inspection');

            return value === null
              ? null
              : _moment2.default
                  .utc(this.getDataValue('dt_inspection'))
                  .format('YYYY-MM-DD');
          },
        },
        tp_inspection: _sequelize.DataTypes.TINYINT(4),
        dt_new_end: {
          type: _sequelize.DataTypes.DATEONLY,
          get() {
            const value = this.getDataValue('dt_new_end');
            return value === null
              ? null
              : _moment2.default
                  .utc(this.getDataValue('dt_new_end'))
                  .format('YYYY-MM-DD');
          },
        },
        vl_new_cost: _sequelize.DataTypes.DECIMAL(20, 2),
        dt_created_at: _sequelize.DataTypes.DATE,
        dt_updated_at: _sequelize.DataTypes.DATE,
      },
      {
        tableName: 'inspection',
        sequelize,
      }
    );

    return Inspection;
  }

  static associate(models) {
    Inspection.hasMany(models.Inspection_document, {
      foreignKey: 'id_inspection',
      as: 'inspection_document',
    });
    Inspection.belongsTo(models.Project_phase, {
      foreignKey: 'id_project_phase',
      as: 'project_phase',
    });
    Inspection.belongsTo(models.Professional, {
      foreignKey: 'id_professional',
      as: 'professional',
    });
  }
} exports.Inspection = Inspection;
