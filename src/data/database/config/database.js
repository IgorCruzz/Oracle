require('dotenv/config');

module.exports = {
  dialect: 'mysql',
  host: 'x8autxobia7sgh74.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  username: 'ivdb488dfbm55d25',
  password: 'tsyzrnhplclwe3dz',
  database: 'n6gecc4s901uxvz7',
  logging: false,
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
    decimalNumbers: true,
  },
};
