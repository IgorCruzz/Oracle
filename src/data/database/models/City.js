import { Model, DataTypes } from 'sequelize';

export class City extends Model {
  static init(sequelize) {
    super.init(
      {
        id_city: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        nm_city: DataTypes.STRING,
        dt_created_at: DataTypes.DATE,
        dt_updated_at: DataTypes.DATE,
      },
      {
        sequelize,
      }
    );

    return City;
  }

  static associate(models) {
    City.belongsTo(models.Region, { foreignKey: 'id_region', as: 'region' });
  }
}
