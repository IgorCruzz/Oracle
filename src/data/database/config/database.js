require('dotenv/config');

module.exports = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  options: {
    requestTimeout: 3000,
  },
  logging: true,
  define: {
    timestamps: false,
    freezeTableName: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
  pool: {
    max: 50,
    min: 0,
    acquire: 1200000,
    idle: 1000000,
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
