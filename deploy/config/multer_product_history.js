"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer');
var _path = require('path');
var _crypto = require('crypto'); var _crypto2 = _interopRequireDefault(_crypto);

 const folder = _path.resolve.call(void 0, __dirname, '..', '..', 'tmp', 'product_history'); exports.folder = folder;

 const storage = _multer.diskStorage.call(void 0, {
  destination: (req, file, cb) => {
    cb(null, exports.folder);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${_crypto2.default.randomBytes(10).toString('Hex')}${_path.extname.call(void 0, file.originalname)}`
    );
  },
}); exports.storage = storage;
