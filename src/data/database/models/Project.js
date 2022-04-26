import { Model, DataTypes } from 'sequelize';
import moment from 'moment';

export class Project extends Model {
  static init(sequelize) {
    super.init(
      {
        id_project: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nm_project: DataTypes.STRING(255),
        tx_description: DataTypes.STRING(1000),
        vl_estimated: DataTypes.DECIMAL(20, 2),
        vl_bid: DataTypes.DECIMAL(20, 2),
        vl_contract: DataTypes.DECIMAL(20, 2),
        cd_sei: DataTypes.STRING(25),
        cd_priority: DataTypes.TINYINT(4),
        cd_complexity: DataTypes.TINYINT(4),
        qt_m2: DataTypes.DECIMAL(20, 2),
        ds_official_document: DataTypes.STRING(1000),
        nm_official_document_applicant: DataTypes.STRING(255),
        dt_official_document: {
          type: DataTypes.DATEONLY,
          get() {
            return moment
              .utc(this.getDataValue('dt_official_document'))
              .format('YYYY-MM-DD');
          },
        },
        dt_created_at: DataTypes.DATE,
        dt_updated_at: DataTypes.DATE,
      },
      {
        sequelize,
      }
    );

    return Project;
  }

  static associate(models) {
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
}
