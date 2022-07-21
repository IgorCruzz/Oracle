import { Model, DataTypes } from 'sequelize';
import moment from 'moment';

export class Contact_history extends Model {
  static init(sequelize) {
    super.init(
      {
        id_contact_history: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        dt_contatct: {
          type: DataTypes.DATEONLY,
          get() {
            const value = this.getDataValue('dt_contatct');

            return value === null
              ? null
              : moment
                  .utc(this.getDataValue('dt_contatct'))
                  .format('YYYY-MM-DD');
          },
        },
        hr_contact: DataTypes.TIME,
        ds_contact: DataTypes.STRING,
        dt_agreed_feedback: {
          type: DataTypes.DATEONLY,
          get() {
            const value = this.getDataValue('dt_agreed_feedback');

            return value === null
              ? null
              : moment
                  .utc(this.getDataValue('dt_agreed_feedback'))
                  .format('YYYY-MM-DD');
          },
        },
        dt_feedback: {
          type: DataTypes.DATEONLY,
          get() {
            const value = this.getDataValue('dt_feedback');

            return value === null
              ? null
              : moment
                  .utc(this.getDataValue('dt_feedback'))
                  .format('YYYY-MM-DD');
          },
        },

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
