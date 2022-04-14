require('dotenv/config');

module.exports = {
  dialect: 'mysql',
  host: 'us-cdbr-east-05.cleardb.net',
  username: 'b34a55bf1f7bb4',
  password: '17b61181',
  database: 'heroku_2705c9a53c5221e',
  define: {
    timestamps: false,
    freezeTableName: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
  timezone: '-03:00',
  dialectOptions: {
    typeCast(field, next) {
      if (field.type === 'DATETIME') {
        return field.string();
      }
      return next();
    },
  },
};
