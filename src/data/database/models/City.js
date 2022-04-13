import { Model, DataTypes } from 'sequelize';

export class City extends Model {
  static init(sequelize) {
    super.init(
      {
        ID_CITY: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        NM_CITY: DataTypes.STRING,
        DT_CREATED_AT: DataTypes.DATE,
        DT_UPDATED_AT: DataTypes.DATE,
      },
      {
        sequelize,
      }
    );

    return City;
  }

  static associate(models) {
    City.belongsTo(models.Region, { foreignKey: 'ID_REGION', as: 'region' });
  }
}
