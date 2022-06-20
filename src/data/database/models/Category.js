import { Model, DataTypes } from 'sequelize';

export class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        id_category: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nm_category: DataTypes.STRING,
        dt_created_at: DataTypes.DATE,
        dt_updated_at: DataTypes.DATE,
      },
      {
        tableName: 'category',
        sequelize,
      }
    );

    return Category;
  }
}
