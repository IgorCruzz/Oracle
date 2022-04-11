var __require = (x) => {
  if (typeof require !== "undefined")
    return require(x);
  throw new Error('Dynamic require of "' + x + '" is not supported');
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = {exports: {}}).exports, mod), mod.exports;
};

// src/data/database/config/database.js
var require_database = __commonJS({
  "src/data/database/config/database.js"(exports, module) {
    __require("dotenv/config");
    module.exports = {
      dialect: "postgres",
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true
      }
    };
  }
});
export default require_database();
