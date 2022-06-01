import { Model, DataTypes } from 'sequelize';

export class Inspection_document extends Model {
  static init(sequelize) {
    super.init(
      {
        id_inspection_document: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nm_document: {
          type: DataTypes.STRING(1000),
        },       
        nm_original_file: {
          type: DataTypes.STRING(1000),
        },
        nm_file: {
          type: DataTypes.STRING(1000),
        },
        dt_created_at: DataTypes.DATE,
        dt_updated_at: DataTypes.DATE,
      },
      {
        sequelize,
      }
    );

    return Inspection_document;
  }

  static associate(models) {
    Inspection_document.belongsTo(models.Inspection, {
      foreignKey: 'id_inspection',
      as: 'inspection',
    });
  }  
}
