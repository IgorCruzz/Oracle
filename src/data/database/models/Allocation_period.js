import { Model, DataTypes } from 'sequelize';
import moment from 'moment';

export class Allocation_period extends Model {
  static init(sequelize) {
    super.init(
      {
        id_allocation_period: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        dt_start_allocation: {
          type: DataTypes.DATEONLY,
          get() {
            const value = this.getDataValue('dt_start_allocation');

            return value === null
              ? null
              : moment
                  .utc(this.getDataValue('dt_start_allocation'))
                  .format('YYYY-MM-DD');
          },
        },
        dt_end_allocation: {
          type: DataTypes.DATEONLY,
          get() {
            const value = this.getDataValue('dt_end_allocation');

            return value === null
              ? null
              : moment
                  .utc(this.getDataValue('dt_end_allocation'))
                  .format('YYYY-MM-DD');
          },
        },
        qt_business_hours: DataTypes.SMALLINT,
        dt_created_at: DataTypes.DATE,
        dt_updated_at: DataTypes.DATE,
      },
      {
        sequelize,
      }
    );

    return Allocation_period;
  }
}
