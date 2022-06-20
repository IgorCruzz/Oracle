import { Model, DataTypes } from 'sequelize';
import moment from 'moment';

export class Document extends Model {
  static init(sequelize) {
    super.init(
      {
        id_document: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        ds_document: {
          type: DataTypes.STRING(255),
        },
        nu_document_sei: DataTypes.INTEGER,
        dt_upload: {
          type: DataTypes.DATEONLY,
          get() {
            const value = this.getDataValue('dt_upload');

            return value === null
              ? null
              : moment.utc(this.getDataValue('dt_upload')).format('YYYY-MM-DD');
          },
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
        tableName: 'document',
        sequelize,
      }
    );

    return Document;
  }

  static associate(models) {
    Document.belongsTo(models.Product, {
      foreignKey: 'id_product',
      as: 'product',
    });
  }
}
