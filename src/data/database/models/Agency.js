import { Model, DataTypes } from 'sequelize';

export class Agency extends Model {
  static init(sequelize) {
    super.init(
      {
        id_agency: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nm_agency: DataTypes.STRING,
        dt_created_at: DataTypes.DATE,
        dt_updated_at: DataTypes.DATE,
      },
      {
        sequelize,
      }
    );

    return Agency;
  }

  static associate(models) {
    Agency.belongsTo(models.Jurisdiction, {
      foreignKey: 'id_jurisdiction',
      as: 'jurisdiction',
    });
  }
}
