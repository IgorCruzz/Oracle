"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _moment = require('moment'); var _moment2 = _interopRequireDefault(_moment);

 class Project extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id_project: {
          type: _sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nm_project: {
          type: _sequelize.DataTypes.STRING(255),
        },
        tx_description: {
          type: _sequelize.DataTypes.STRING(1000),
        },
        vl_estimated: _sequelize.DataTypes.DECIMAL(20, 2),
        vl_bid: _sequelize.DataTypes.DECIMAL(20, 2),
        vl_contract: _sequelize.DataTypes.DECIMAL(20, 2),
        cd_sei: {
          type: _sequelize.DataTypes.STRING(25),
        },
        cd_priority: _sequelize.DataTypes.TINYINT(4),
        cd_complexity: _sequelize.DataTypes.TINYINT(4),
        qt_m2: _sequelize.DataTypes.DECIMAL(20, 2),

        nm_official_document_applicant: {
          type: _sequelize.DataTypes.STRING(255),
        },
        dt_official_document: {
          type: _sequelize.DataTypes.DATEONLY,
          get() {
            const value = this.getDataValue('dt_official_document');

            return value === null
              ? null
              : _moment2.default
                  .utc(this.getDataValue('dt_official_document'))
                  .format('YYYY-MM-DD');
          },
        },
        dt_deleted_at: _sequelize.DataTypes.DATE,
        nm_deleted_by: {
          type: _sequelize.DataTypes.STRING(255),
        },
        dt_created_at: _sequelize.DataTypes.DATE,
        dt_updated_at: _sequelize.DataTypes.DATE,
      },
      {
        tableName: 'project',
        sequelize,
      }
    );

    return Project;
  }

  static associate(models) {
    Project.hasMany(models.Project_phase, {
      foreignKey: 'id_project',
      as: 'project_phase',
    });

    Project.hasMany(models.Location, {
      foreignKey: 'id_project',
      as: 'location',
    });

    Project.belongsTo(models.City, {
      foreignKey: 'id_city',
      as: 'city',
    });
    Project.belongsTo(models.Category, {
      foreignKey: 'id_category',
      as: 'category',
    });
    Project.belongsTo(models.Program, {
      foreignKey: 'id_program',
      as: 'program',
    });
    Project.belongsTo(models.Agency, {
      foreignKey: 'id_agency',
      as: 'agency',
    });
  }
} exports.Project = Project;
