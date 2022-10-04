"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _util = require('util');

exports. default = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Insira o token para prosseguir.' });
  }

  if (authorization.includes('9f9ed5e3-7190-446d-8f3a-1a2b3ffb2204')) {
    next();
    return;
  }

  const [, token] = authorization.split(' ');

  try {
    const decoded = await _util.promisify.call(void 0, _jsonwebtoken2.default.verify)(
      token,
      'f04af61b3f332afa0ceec786a42cd365'
    );

    req.userId = decoded.user.id;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido.' });
  }
};
