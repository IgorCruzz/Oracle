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
        nm_contact: DataTypes.STRING(100),
        nu_phone: DataTypes.STRING(100),
        ds_email: DataTypes.STRING(100),
        tx_remark: DataTypes.STRING(1000),

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
