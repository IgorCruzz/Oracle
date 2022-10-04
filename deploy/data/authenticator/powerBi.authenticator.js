"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _ipware = require('ipware'); var _ipware2 = _interopRequireDefault(_ipware);
var _datefns = require('date-fns');
var _models = require('../database/models');

const checkToken = async ({ cd_bi_token, nm_bi, nu_ip_request, next, res }) => {
  const token = await _models.Bi_configuration.findOne({
    where: {
      [_sequelize.Op.and]: [{ cd_bi_token: cd_bi_token.trim() }, { nm_bi }],
    },
  });

  if (!token) {
    return res.status(401).json({ error: 'Token inválido.' });
  }

  const { id_bi_configuration } = token;

  await _models.Bi_log.create({
    dt_request: _datefns.subHours.call(void 0, new Date(), 3),
    nu_ip_request,
    id_bi_configuration,
  });

  next();
};

 const powerBIAuthenticator = ({ service }) => async (req, res, next) => {
  const { cd_bi_token } = req.headers;

  if (!cd_bi_token) {
    return res.status(401).json({ error: 'Insira o token para prosseguir.' });
  }

  const getIp = _ipware2.default.call(void 0, ).get_trusted_ip(req);

  const services = {
    Portfolio: 'Portfolio',
    Projeto: 'Projeto',
    Colaborador: 'Colaborador',
    Vistoria: 'Vistoria',
  };

  if (services[service]) {
    checkToken({
      nu_ip_request: getIp.clientIp.toString().replace('::ffff:', ''),
      cd_bi_token,
      nm_bi: service,
      next,
      res,
    });
  }
}; exports.powerBIAuthenticator = powerBIAuthenticator;
