import { Model, DataTypes } from 'sequelize';

export class Contact_history extends Model {
  static init(sequelize) {
    super.init(
      {
        id_contact_history: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        dt_contatct: DataTypes.STRING,
        hr_contact: DataTypes.TIME,
        ds_contact: DataTypes.STRING,
        dt_agreed_feedback: DataTypes.DATE,

        dt_created_at: DataTypes.DATE,
        dt_updated_at: DataTypes.DATE,
      },
      {
        tableName: 'contact_history',
        sequelize,
      }
    );

    return Contact_history;
  }

  static associate(models) {
    Contact_history.belongsTo(models.Contact, {
      foreignKey: 'id_contact',
      as: 'contact',
    });
  }
}
