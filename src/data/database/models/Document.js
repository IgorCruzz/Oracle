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
        dt_upload: {
          type: DataTypes.DATEONLY,
          get() {
            return moment
              .utc(this.getDataValue('dt_official_document'))
              .format('YYYY-MM-DD');
          },
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

    return Document;
  }

  static associate(models) {
    Document.belongsTo(models.Product, {
      foreignKey: 'id_product',
      as: 'product',
    });
  }
}
