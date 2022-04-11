var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/data/seeders/02-populate-users.js
var populate_users_exports = {};
__export(populate_users_exports, {
  default: () => populate_users_default
});
module.exports = __toCommonJS(populate_users_exports);
var populate_users_default = {
  up: (queryInterface) => {
    const admin = {
      id: 1,
      sub: "4d4aa73a-e2b8-481b-94bc-5a54d13e93b0",
      name: "Admin",
      email: "admin@admin.com",
      password: "$2a$10$bQ9DXOhVcL697kxv1ABDlu9w.OvzRZZsO8FNevPJTKoqtPzOmTWnK",
      cellPhoneNumber: "(21) 99999-9999",
      role: "SUPERADMIN",
      AccountId: 1,
      createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
      updatedAt: new Date().toISOString().slice(0, 19).replace("T", " ")
    };
    return queryInterface.bulkInsert("Users", [admin], {});
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
