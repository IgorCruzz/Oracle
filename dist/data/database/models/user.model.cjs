var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/data/database/models/user.model.js
var user_model_exports = {};
__export(user_model_exports, {
  default: () => user_model_default,
  userAttributes: () => userAttributes
});
module.exports = __toCommonJS(user_model_exports);
var import_sequelize = require("sequelize");
var import_bcryptjs = __toESM(require("bcryptjs"), 1);
var import_uuid = require("uuid");
var userAttributes = {
  id: { allowNull: false, autoIncrement: true, primaryKey: true, type: import_sequelize.DataTypes.INTEGER },
  sub: { type: import_sequelize.DataTypes.STRING, allowNull: false, unique: true, validate: { notEmpty: true } },
  email: { type: import_sequelize.DataTypes.STRING },
  password: { type: import_sequelize.DataTypes.STRING },
  name: import_sequelize.DataTypes.STRING,
  cellPhoneNumber: import_sequelize.DataTypes.STRING,
  role: import_sequelize.DataTypes.STRING,
  resetPasswordToken: import_sequelize.DataTypes.STRING,
  resetPasswordTokenSentAt: import_sequelize.DataTypes.DATE,
  passwordUpdatedAt: import_sequelize.DataTypes.DATE,
  emailValidatedAt: import_sequelize.DataTypes.DATE,
  emailValidationCode: import_sequelize.DataTypes.STRING,
  cellPhoneNumberValidatedAt: import_sequelize.DataTypes.DATE,
  gender: import_sequelize.DataTypes.STRING,
  AccountId: { type: import_sequelize.DataTypes.INTEGER, references: { model: "Accounts", key: "id" } },
  deletedAt: import_sequelize.DataTypes.DATE,
  createdAt: { allowNull: false, type: import_sequelize.DataTypes.DATE },
  updatedAt: { allowNull: false, type: import_sequelize.DataTypes.DATE }
};
var userModel = (sequelize) => {
  const Model = sequelize.define("User", userAttributes, { paranoid: true });
  Model.prototype.validatePassword = async function(password) {
    const result = await import_bcryptjs.default.compare(password, this.password);
    return result;
  };
  Model.associate = (models) => {
    Model.belongsTo(models.Account, { foreignKey: { allowNull: true } });
  };
  Model.beforeValidate(async (user) => {
    user.sub = (0, import_uuid.v4)();
  });
  Model.beforeCreate(async (user) => {
    const hashedPassword = await import_bcryptjs.default.hash(user.password, 10);
    user.password = hashedPassword;
  });
  return Model;
};
var user_model_default = userModel;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userAttributes
});
