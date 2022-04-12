import Sequelize, { Model } from 'sequelize';

class Example extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return Example;
  }
}
export default Example;
