"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _moment = require('moment'); var _moment2 = _interopRequireDefault(_moment);

 class Project_phase extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id_project_phase: {
          type: _sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nu_order: _sequelize.DataTypes.SMALLINT(6),
        nm_project_phase: _sequelize.DataTypes.STRING(20),
        dt_planned_start: {
          type: _sequelize.DataTypes.DATEONLY,
          get() {
            const value = this.getDataValue('dt_planned_start');

            return value === null
              ? null
              : _moment2.default
                  .utc(this.getDataValue('dt_planned_start'))
                  .format('YYYY-MM-DD');
          },
        },
        tp_project_phase: _sequelize.DataTypes.SMALLINT,
        dt_planned_end: {
          type: _sequelize.DataTypes.DATEONLY,
          get() {
            const value = this.getDataValue('dt_planned_end');

            return value === null
              ? null
              : _moment2.default
                  .utc(this.getDataValue('dt_planned_end'))
                  .format('YYYY-MM-DD');
          },
        },
        vl_phase: _sequelize.DataTypes.DECIMAL(20, 2),
        dt_created_at: _sequelize.DataTypes.DATE,
        dt_updated_at: _sequelize.DataTypes.DATE,
      },
      {
        tableName: 'project_phase',
        sequelize,
      }
    );

    return Project_phase;
  }

  static associate(models) {
    Project_phase.belongsTo(models.Project, {
      foreignKey: 'id_project',
      as: 'project',
    });
    Project_phase.hasMany(models.Product, {
      foreignKey: 'id_project_phase',
      as: 'product',
    });
    Project_phase.hasMany(models.Inspection, {
      foreignKey: 'id_project_phase',
      as: 'inspection',
    });
    Project_phase.hasMany(models.Timelapse_Coordinates, {
      foreignKey: 'id_project_phase',
      as: 'timelapse',
    });
  }
} exports.Project_phase = Project_phase;
