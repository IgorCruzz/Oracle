import { Model, DataTypes } from 'sequelize';

export class Categoria extends Model {
  static init(sequelize) {
    super.init(
      {
        ID_CATEGORIA: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        NM_CATEGORIA: DataTypes.STRING,
        DT_CREATED_AT: DataTypes.DATE,
        DT_UPDATED_AT: DataTypes.DATE,
      },
      {
        sequelize,
      }
    );

    return Categoria;
  }
}
