import { Model, DataTypes } from 'sequelize';

export class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        ID_CATEGORY: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        NM_CATEGORY: DataTypes.STRING,
        DT_CREATED_AT: DataTypes.DATE,
        DT_UPDATED_AT: DataTypes.DATE,
      },
      {
        sequelize,
      }
    );

    return Category;
  }
}
