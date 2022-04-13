import { Model, DataTypes } from 'sequelize';

export class Agency extends Model {
  static init(sequelize) {
    super.init(
      {
        ID_AGENCY: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        NM_AGENCY: DataTypes.STRING,
        DT_CREATED_AT: DataTypes.DATE,
        DT_UPDATED_AT: DataTypes.DATE,
      },
      {
        sequelize,
      }
    );

    return Agency;
  }

  static associate(models) {
    Agency.belongsTo(models.Jurisdiction, {
      foreignKey: 'ID_JURISDICTION',
      as: 'jurisdiction',
    });
  }
}
