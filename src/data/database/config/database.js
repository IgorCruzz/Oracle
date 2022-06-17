require('dotenv/config');

module.exports = {
  dialect: 'mysql',
  host: '143.198.191.56',
  username: 'gerobras',
  password: 'Ger@1234Obras',
  database: 'gerobras',
  options: {
    requestTimeout: 3000,
  },
  logging: false,
  define: {
    timestamps: false,
    freezeTableName: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
  timezone: '-03:00',
  quoteIdentifiers: false,

  dialectOptions: {
    typeCast(field, next) {
      if (field.type === 'DATETIME') {
        return field.string();
      }
      return next();
    },
    decimalNumbers: true,
  },
};
