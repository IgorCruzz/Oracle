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

// src/data/seeders/03-populate-companies.js
var populate_companies_exports = {};
__export(populate_companies_exports, {
  default: () => populate_companies_default
});
module.exports = __toCommonJS(populate_companies_exports);
var import_dotenv = __toESM(require("dotenv"), 1);
var import_mongodb = require("mongodb");
import_dotenv.default.config();
var populate_companies_default = {
  up: async (queryInterface) => {
    const client = new import_mongodb.MongoClient(process.env.MONGODB_CONNECTION_STRING);
    await client.connect();
    const Company = client.db("companyServiceDB").collection("company");
    const companies = await Company.find({}).toArray();
    const toInsert = [];
    for (const company of companies) {
      toInsert.push({
        cnpj: company.cnpj,
        uuid: company._id,
        name: company.nomeFantasia,
        corporateName: company.razaoSocial,
        uf: (company == null ? void 0 : company.estado) ? company.estado.toUpperCase() : "",
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    return queryInterface.bulkInsert("Companies", toInsert, {});
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete("Companies", null, {});
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
