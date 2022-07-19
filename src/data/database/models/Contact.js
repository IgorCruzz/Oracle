import { Model, DataTypes } from 'sequelize';

export class Contact extends Model {
  static init(sequelize) {
    super.init(
      {
        id_contact: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nm_contact: DataTypes.STRING,
        nu_phone: DataTypes.STRING,
        ds_email: DataTypes.STRING,
        tx_remark: DataTypes.STRING,

        dt_created_at: DataTypes.DATE,
        dt_updated_at: DataTypes.DATE,
      },
      {
        tableName: 'contact',
        sequelize,
      }
    );

    return Contact;
  }

  static associate(models) {
    Contact.belongsTo(models.Project, {
      foreignKey: 'id_project',
      as: 'project',
    });
  }
}
